// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../token/Token.sol";
import "../permission/AccControl.sol";
import "../security/CustomHash.sol";

/**
 * @title Finance
 * @dev مدیریت امور مالی، سرمایه‌گذاری و پرداخت‌ها در شبکه DAO-VC
 */
contract Finance is Ownable2Step, ReentrancyGuard, Pausable {
    using SafeMath for uint256;

    Token public token;
    AccControl public accControl;
    CustomHash public hasher;

    // ثابت‌های قرارداد
    uint256 public constant MIN_INVESTMENT = 100 * 10**18; // حداقل سرمایه‌گذاری
    uint256 public constant MAX_INVESTMENT = 1000000 * 10**18; // حداکثر سرمایه‌گذاری
    uint256 public constant LOCK_PERIOD = 30 days; // دوره قفل پیش‌فرض
    uint256 public constant INSTALLMENT_PERIOD = 30 days; // دوره اقساط
    uint256 public constant MULTI_SIG_THRESHOLD = 1000 * 10**18; // حد نصاب نیاز به تأیید چند امضایی

    // سطوح سرمایه‌گذاری
    enum InvestmentTier {
        BRONZE,     // 100-1000 tokens
        SILVER,     // 1001-10000 tokens
        GOLD,       // 10001-100000 tokens
        PLATINUM    // 100001+ tokens
    }

    // ساختار سرمایه‌گذاری
    struct Investment {
        uint256 amount;
        uint256 startTime;
        uint256 lockEndTime;
        uint256 rewards;
        bool active;
        bytes32 hash;
        InvestmentTier tier;
    }

    // ساختار پرداخت اقساطی
    struct InstallmentPlan {
        uint256 totalAmount;
        uint256 amountPaid;
        uint256 installmentAmount;
        uint256 nextPaymentDate;
        uint256 numberOfInstallments;
        uint256 remainingInstallments;
        bool active;
        bytes32 hash;
    }

    // وضعیت تراکنش
    enum TransactionStatus {
        PENDING,
        APPROVED,
        REJECTED,
        EXECUTED
    }

    // ساختار تراکنش چند امضایی
    struct MultiSigTransaction {
        address initiator;
        address recipient;
        uint256 amount;
        uint256 approvals;
        bool executed;
        TransactionStatus status;
        mapping(address => bool) hasApproved;
        mapping(address => bool) validations;
        uint256 validationCount;
        uint256 approvalCount;
        uint256 rejectionCount;
        bytes32 hash;
    }

    // نگاشت‌های قرارداد
    mapping(address => Investment) public investments;
    mapping(address => InstallmentPlan) public installmentPlans;
    mapping(bytes32 => bool) public transactionHashes;
    mapping(uint256 => MultiSigTransaction) public multiSigTransactions;
    mapping(address => uint256) public penalties;
    mapping(address => uint256) public rewards;

    uint256 public multiSigTransactionCount;
    uint256 public requiredApprovals = 3;

    // رویدادها
    event InvestmentMade(address indexed investor, uint256 amount, InvestmentTier tier, bytes32 hash);
    event InvestmentWithdrawn(address indexed investor, uint256 amount, uint256 rewards, bytes32 hash);
    event InstallmentPlanCreated(address indexed payer, uint256 totalAmount, uint256 numberOfInstallments, bytes32 hash);
    event InstallmentPaid(address indexed payer, uint256 amount, uint256 remaining, bytes32 hash);
    event MultiSigTransactionCreated(uint256 indexed txId, address initiator, address recipient, uint256 amount, bytes32 hash);
    event MultiSigTransactionApproved(uint256 indexed txId, address approver);
    event MultiSigTransactionExecuted(uint256 indexed txId, bytes32 hash);
    event TransactionValidated(uint256 indexed transactionId, address indexed validator, bool isValid, bytes validationData);
    event RewardAdded(address indexed user, uint256 amount, bytes32 reason);
    event PenaltyAdded(address indexed user, uint256 amount, bytes32 reason);

    /**
     * @dev سازنده قرارداد
     */
    constructor(
        address _token,
        address _accControl,
        address _hasher,
        address initialOwner
    ) {
        require(_token != address(0), "Invalid token address");
        require(_accControl != address(0), "Invalid AccControl address");
        require(_hasher != address(0), "Invalid hasher address");
        require(initialOwner != address(0), "Invalid owner address");
        
        _transferOwnership(initialOwner);
        token = Token(_token);
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);
    }

    /**
     * @dev تعیین سطح سرمایه‌گذاری بر اساس مقدار
     */
    function _determineInvestmentTier(uint256 amount) internal pure returns (InvestmentTier) {
        if (amount >= 100001 * 10**18) return InvestmentTier.PLATINUM;
        if (amount >= 10001 * 10**18) return InvestmentTier.GOLD;
        if (amount >= 1001 * 10**18) return InvestmentTier.SILVER;
        return InvestmentTier.BRONZE;
    }

    /**
     * @dev محاسبه پاداش بر اساس سطح سرمایه‌گذاری و مدت زمان
     */
    function _calculateRewards(uint256 amount, uint256 duration, InvestmentTier tier) internal pure returns (uint256) {
        uint256 baseRate = 5; // نرخ پایه 5%
        
        // افزایش نرخ بر اساس سطح
        if (tier == InvestmentTier.SILVER) baseRate = 7;
        else if (tier == InvestmentTier.GOLD) baseRate = 10;
        else if (tier == InvestmentTier.PLATINUM) baseRate = 15;

        return amount.mul(baseRate).mul(duration).div(365 days).div(100);
    }

    /**
     * @dev سرمایه‌گذاری توکن‌ها
     */
    function invest(uint256 amount) external nonReentrant whenNotPaused {
        require(amount >= MIN_INVESTMENT, "Investment too small");
        require(amount <= MAX_INVESTMENT, "Investment too large");
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");

        bytes32 investHash = hasher.customHash(
            abi.encodePacked(msg.sender, amount, block.timestamp),
            keccak256("invest")
        );
        require(!transactionHashes[investHash], "Duplicate transaction");

        InvestmentTier tier = _determineInvestmentTier(amount);
        
        token.transferFrom(msg.sender, address(this), amount);
        
        investments[msg.sender] = Investment({
            amount: amount,
            startTime: block.timestamp,
            lockEndTime: block.timestamp.add(LOCK_PERIOD),
            rewards: 0,
            active: true,
            hash: investHash,
            tier: tier
        });

        transactionHashes[investHash] = true;
        emit InvestmentMade(msg.sender, amount, tier, investHash);
    }

    /**
     * @dev برداشت سرمایه‌گذاری و پاداش‌ها
     */
    function withdraw() external nonReentrant whenNotPaused {
        Investment storage investment = investments[msg.sender];
        require(investment.active, "No active investment");
        require(block.timestamp >= investment.lockEndTime, "Still in lock period");

        bytes32 withdrawHash = hasher.customHash(
            abi.encodePacked(msg.sender, investment.amount, block.timestamp),
            keccak256("withdraw")
        );
        require(!transactionHashes[withdrawHash], "Duplicate withdrawal");

        uint256 duration = block.timestamp.sub(investment.startTime);
        uint256 rewardAmount = _calculateRewards(investment.amount, duration, investment.tier);
        uint256 totalAmount = investment.amount.add(rewardAmount).sub(penalties[msg.sender]);

        investment.active = false;
        transactionHashes[withdrawHash] = true;
        penalties[msg.sender] = 0;

        token.transfer(msg.sender, totalAmount);
        emit InvestmentWithdrawn(msg.sender, investment.amount, rewardAmount, withdrawHash);
    }

    /**
     * @dev ایجاد طرح پرداخت اقساطی
     */
    function createInstallmentPlan(
        uint256 totalAmount,
        uint256 numberOfInstallments
    ) external nonReentrant whenNotPaused {
        require(totalAmount > 0, "Invalid total amount");
        require(numberOfInstallments > 0, "Invalid number of installments");
        require(totalAmount >= numberOfInstallments * 10**18, "Amount too small for installments");

        bytes32 planHash = hasher.customHash(
            abi.encodePacked(msg.sender, totalAmount, numberOfInstallments, block.timestamp),
            keccak256("installment_plan")
        );
        require(!transactionHashes[planHash], "Duplicate plan");

        uint256 installmentAmount = totalAmount.div(numberOfInstallments);
        
        installmentPlans[msg.sender] = InstallmentPlan({
            totalAmount: totalAmount,
            amountPaid: 0,
            installmentAmount: installmentAmount,
            nextPaymentDate: block.timestamp.add(INSTALLMENT_PERIOD),
            numberOfInstallments: numberOfInstallments,
            remainingInstallments: numberOfInstallments,
            active: true,
            hash: planHash
        });

        transactionHashes[planHash] = true;
        emit InstallmentPlanCreated(msg.sender, totalAmount, numberOfInstallments, planHash);
    }

    /**
     * @dev پرداخت قسط
     */
    function payInstallment() external nonReentrant whenNotPaused {
        InstallmentPlan storage plan = installmentPlans[msg.sender];
        require(plan.active, "No active installment plan");
        require(plan.remainingInstallments > 0, "All installments paid");
        require(block.timestamp >= plan.nextPaymentDate, "Too early for next payment");
        require(token.balanceOf(msg.sender) >= plan.installmentAmount, "Insufficient balance");

        bytes32 paymentHash = hasher.customHash(
            abi.encodePacked(msg.sender, plan.installmentAmount, block.timestamp),
            keccak256("installment_payment")
        );
        require(!transactionHashes[paymentHash], "Duplicate payment");

        token.transferFrom(msg.sender, address(this), plan.installmentAmount);
        
        plan.amountPaid = plan.amountPaid.add(plan.installmentAmount);
        plan.remainingInstallments = plan.remainingInstallments.sub(1);
        plan.nextPaymentDate = block.timestamp.add(INSTALLMENT_PERIOD);
        
        if (plan.remainingInstallments == 0) {
            plan.active = false;
        }

        transactionHashes[paymentHash] = true;
        emit InstallmentPaid(msg.sender, plan.installmentAmount, plan.remainingInstallments, paymentHash);
    }

    /**
     * @dev ایجاد تراکنش چند امضایی
     */
    function createMultiSigTransaction(
        address recipient,
        uint256 amount
    ) external nonReentrant whenNotPaused {
        require(amount >= MULTI_SIG_THRESHOLD, "Amount below threshold");
        require(recipient != address(0), "Invalid recipient");
        require(token.balanceOf(address(this)) >= amount, "Insufficient contract balance");

        bytes32 txHash = hasher.customHash(
            abi.encodePacked(msg.sender, recipient, amount, block.timestamp),
            keccak256("multi_sig_tx")
        );
        require(!transactionHashes[txHash], "Duplicate transaction");

        multiSigTransactionCount++;
        MultiSigTransaction storage transaction = multiSigTransactions[multiSigTransactionCount];
        transaction.initiator = msg.sender;
        transaction.recipient = recipient;
        transaction.amount = amount;
        transaction.approvals = 1;
        transaction.executed = false;
        transaction.status = TransactionStatus.PENDING;
        transaction.hash = txHash;
        transaction.hasApproved[msg.sender] = true;

        transactionHashes[txHash] = true;
        emit MultiSigTransactionCreated(multiSigTransactionCount, msg.sender, recipient, amount, txHash);
    }

    /**
     * @dev تأیید تراکنش چند امضایی
     */
    function approveMultiSigTransaction(uint256 txId) external nonReentrant whenNotPaused {
        // تأیید تراکنش
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Validator, "Not a validator");
        MultiSigTransaction storage transaction = multiSigTransactions[txId];
        require(!transaction.executed, "Transaction already executed");
        require(!transaction.hasApproved[msg.sender], "Already approved");

        transaction.approvals = transaction.approvals.add(1);
        transaction.hasApproved[msg.sender] = true;

        emit MultiSigTransactionApproved(txId, msg.sender);

        if (transaction.approvals >= requiredApprovals) {
            _executeMultiSigTransaction(txId);
        }
    }

    /**
     * @dev اجرای تراکنش چند امضایی
     */
    function _executeMultiSigTransaction(uint256 txId) internal {
        MultiSigTransaction storage transaction = multiSigTransactions[txId];
        require(!transaction.executed, "Transaction already executed");
        require(token.balanceOf(address(this)) >= transaction.amount, "Insufficient balance");

        transaction.executed = true;
        transaction.status = TransactionStatus.EXECUTED;
        token.transfer(transaction.recipient, transaction.amount);

        emit MultiSigTransactionExecuted(txId, transaction.hash);
    }

    /**
     * @dev اضافه کردن پاداش
     */
    function addReward(
        address user,
        uint256 amount,
        bytes32 reason
    ) external {
        // تأیید تراکنش
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Validator, "Not authorized");
        rewards[user] = rewards[user].add(amount);
        emit RewardAdded(user, amount, reason);
    }

    /**
     * @dev اضافه کردن جریمه
     */
    function addPenalty(
        address user,
        uint256 amount,
        bytes32 reason
    ) external {
        // تأیید تراکنش
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Validator, "Not authorized");
        penalties[user] = penalties[user].add(amount);
        emit PenaltyAdded(user, amount, reason);
    }

    /**
     * @dev به‌روزرسانی تعداد تأییدهای مورد نیاز
     */
    function updateRequiredApprovals(uint256 _requiredApprovals) external {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.DAO, "Not authorized");
        require(_requiredApprovals > 0, "Invalid number of approvals");
        requiredApprovals = _requiredApprovals;
    }

    /**
     * @dev توقف قرارداد
     */
    function pause() external {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.DAO, "Not authorized");
        _pause();
    }

    /**
     * @dev شروع مجدد قرارداد
     */
    function unpause() external {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.DAO, "Not authorized");
        _unpause();
    }

    /**
     * @dev Validate transaction
     */
    function validateTransaction(
        uint256 transactionId,
        bool isValid,
        bytes memory validationData
    ) external whenNotPaused {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Validator, "Not a validator");
        
        MultiSigTransaction storage transaction = multiSigTransactions[transactionId];
        require(transaction.status == TransactionStatus.PENDING, "Invalid status");
        require(!transaction.validations[msg.sender], "Already validated");

        transaction.validations[msg.sender] = true;
        transaction.validationCount++;

        if (isValid) {
            transaction.approvalCount++;
        } else {
            transaction.rejectionCount++;
        }

        emit TransactionValidated(transactionId, msg.sender, isValid, validationData);

        if (_canBeFinalized(transaction)) {
            _finalizeTransaction(transactionId);
        }
    }

    /**
     * @dev بررسی امکان نهایی‌سازی تراکنش
     */
    function _canBeFinalized(MultiSigTransaction storage transaction) internal view returns (bool) {
        return transaction.approvals >= requiredApprovals && !transaction.executed;
    }

    /**
     * @dev نهایی‌سازی تراکنش
     */
    function _finalizeTransaction(uint256 transactionId) internal {
        MultiSigTransaction storage transaction = multiSigTransactions[transactionId];
        require(_canBeFinalized(transaction), "Cannot finalize");
        
        transaction.executed = true;
        transaction.status = TransactionStatus.EXECUTED;
        token.transfer(transaction.recipient, transaction.amount);
        
        emit MultiSigTransactionExecuted(transactionId, transaction.hash);
    }
} 