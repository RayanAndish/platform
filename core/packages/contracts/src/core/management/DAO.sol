// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol"; // اتصال به قرارداد Ownable از OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // اتصال به رابط IERC20 برای تعامل با توکن‌های ERC20

/**
 * @title DAO
 * @dev قرارداد برای مدیریت سازمان خودمختار غیرمتمرکز (DAO)
 */
contract DAO is Ownable {
    struct Proposal {
        string description; // توضیحات پیشنهاد
        uint256 deadline; // مهلت رأی‌گیری
        uint256 votesFor; // تعداد آراء موافق
        uint256 votesAgainst; // تعداد آراء مخالف
        bool executed; // وضعیت اجرای پیشنهاد
        mapping(address => bool) hasVoted; // نگاشت برای پیگیری آراء داده شده توسط اعضا
    }

    mapping(uint256 => Proposal) private proposals; // نگاشت برای ذخیره‌سازی پیشنهادات
    uint256 public proposalCount; // تعداد پیشنهادات ایجاد شده
    address public tokenAddress; // آدرس قرارداد توکن
    uint256 public votingThreshold; // حداقل تعداد توکن برای شرکت در رأی‌گیری

    // رویدادها برای ثبت تغییرات در قرارداد
    event ProposalCreated(uint256 proposalId, string description, uint256 deadline);
    event VoteCast(address indexed voter, uint256 proposalId, bool support);
    event ProposalExecuted(uint256 proposalId, bool success);

    /**
     * @dev سازنده قرارداد
     * @param initialOwner آدرس مالک اولیه
     * @param _tokenAddress آدرس قرارداد توکن
     * @param _votingThreshold حداقل تعداد توکن برای شرکت در رأی‌گیری
     */
    constructor(address initialOwner, address _tokenAddress, uint256 _votingThreshold) Ownable(initialOwner) {
        require(_tokenAddress != address(0), "Invalid token address");
        require(_votingThreshold > 0, "Voting threshold must be greater than zero");

        tokenAddress = _tokenAddress;
        votingThreshold = _votingThreshold;
    }

    /**
     * @dev Modifier برای اطمینان از اینکه تنها دارندگان توکن می‌توانند عمل انجام دهند
     */
    modifier onlyTokenHolders() {
        require(balanceOf(msg.sender) >= votingThreshold, "Not enough tokens to participate");
        _;
    }

    /**
     * @dev بررسی موجودی توکن یک حساب
     * @param account آدرس حساب
     * @return تعداد توکن‌های حساب
     */
    function balanceOf(address account) internal view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(account);
    }

    /**
     * @dev ایجاد پیشنهاد جدید
     * @param description توضیحات پیشنهاد
     * @param duration مدت زمان رأی‌گیری به ثانیه
     */
    function createProposal(string memory description, uint256 duration) external onlyTokenHolders {
        require(duration > 0, "Duration must be greater than zero");

        Proposal storage newProposal = proposals[proposalCount];
        newProposal.description = description;
        newProposal.deadline = block.timestamp + duration;

        emit ProposalCreated(proposalCount, description, newProposal.deadline);
        proposalCount++;
    }

    /**
     * @dev رأی دادن به یک پیشنهاد
     * @param proposalId شناسه پیشنهاد
     * @param support رأی موافق یا مخالف
     */
    function vote(uint256 proposalId, bool support) external onlyTokenHolders {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp <= proposal.deadline, "Voting period has ended");
        require(!proposal.hasVoted[msg.sender], "You have already voted");

        if (support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }

        proposal.hasVoted[msg.sender] = true;

        emit VoteCast(msg.sender, proposalId, support);
    }

    /**
     * @dev اجرای پیشنهاد پس از پایان دوره رأی‌گیری
     * @param proposalId شناسه پیشنهاد
     */
    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.deadline, "Voting period has not ended");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;
        bool success = proposal.votesFor > proposal.votesAgainst;

        emit ProposalExecuted(proposalId, success);
    }

    /**
     * @dev به‌روزرسانی حد نصاب رأی‌گیری
     * @param newThreshold حد نصاب جدید
     */
    function updateVotingThreshold(uint256 newThreshold) external onlyOwner {
        require(newThreshold > 0, "Threshold must be greater than zero");
        votingThreshold = newThreshold;
    }

    /**
     * @dev دریافت اطلاعات یک پیشنهاد
     * @param proposalId شناسه پیشنهاد
     * @return description توضیحات پیشنهاد
     * @return deadline مهلت پیشنهاد
     * @return votesFor تعداد آراء موافق
     * @return votesAgainst تعداد آراء مخالف
     * @return executed وضعیت اجرای پیشنهاد
     */
    function getProposal(uint256 proposalId)
        external
        view
        returns (
            string memory description,
            uint256 deadline,
            uint256 votesFor,
            uint256 votesAgainst,
            bool executed
        )
    {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.description,
            proposal.deadline,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.executed
        );
    }
}