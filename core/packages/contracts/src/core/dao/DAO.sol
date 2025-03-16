// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable2Step.sol"; // اتصال به قرارداد Ownable2Step از OpenZeppelin
import "../permission/AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "../security/CustomHash.sol"; // اتصال به قرارداد CustomHash برای هش کردن اطلاعات
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // اتصال به رابط IERC20 برای تعامل با توکن‌های ERC20
import {PermissionLib} from "@aragon/osx-commons-contracts/src/permission/PermissionLib.sol";

/**
 * @title DAO
 * @dev مدیریت سازمان مستقل غیرمتمرکز DAO-VC
 */
contract DAO is Ownable2Step {
    using PermissionLib for PermissionLib.MultiTargetPermission[];

    bytes32 public constant ROOT_PERMISSION_ID = keccak256("ROOT_PERMISSION");
    bytes32 public constant UPGRADE_DAO_PERMISSION_ID = keccak256("UPGRADE_DAO_PERMISSION");
    bytes32 public constant SET_TRUSTED_FORWARDER_PERMISSION_ID = keccak256("SET_TRUSTED_FORWARDER_PERMISSION");
    bytes32 public constant SET_METADATA_PERMISSION_ID = keccak256("SET_METADATA_PERMISSION");
    bytes32 public constant REGISTER_STANDARD_CALLBACK_PERMISSION_ID = keccak256("REGISTER_STANDARD_CALLBACK_PERMISSION");

    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // ساختار Project شامل شناسه، عنوان، توضیحات، بودجه، وضعیت و زمان‌ها
    struct Project {
        uint256 id;
        string title;
        string description;
        uint256 budget;
        bool active;
        uint256 startTime;
        uint256 endTime;
    }

    uint256 public projectCount; // شمارنده تعداد پروژه‌ها
    mapping(uint256 => Project) public projects; // نگاشت برای ذخیره پروژه‌ها

    // رویدادها برای ثبت تغییرات در قرارداد
    event ProjectCreated(uint256 indexed projectId, string title, uint256 budget);
    event ProjectUpdated(uint256 indexed projectId, string title, uint256 budget);
    event ProjectCompleted(uint256 indexed projectId);

    /**
     * @dev سازنده قرارداد
     * @param _accControl آدرس قرارداد AccControl
     * @param _hasher آدرس قرارداد تابع هش
     * @param initialOwner آدرس مالک اولیه
     */
    constructor(address _accControl, address _hasher, address initialOwner) {
        require(_accControl != address(0), "Invalid AccControl address");
        require(_hasher != address(0), "Invalid CustomHash address");
        require(initialOwner != address(0), "Invalid owner address");
        
        _transferOwnership(initialOwner);
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);
    }

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

    /**
     * @dev اعمال مجوزهای چند هدفه
     * @param _permissions آرایه‌ای از مجوزهای چند هدفه
     */
    function applyMultiTargetPermissions(PermissionLib.MultiTargetPermission[] calldata _permissions) external {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Admin, "Not authorized");

        for (uint256 i = 0; i < _permissions.length; i++) {
            PermissionLib.MultiTargetPermission memory permission = _permissions[i];
            // اعمال مجوز برای هر هدف
            // در اینجا می‌توانید منطق خاص خود را برای اعمال مجوزها پیاده‌سازی کنید
        }
    }

    /**
     * @dev بررسی مجوز
     */
    function hasPermission(
        address _where,
        address _who,
        bytes32 _permissionId,
        bytes memory _data
    ) external view returns (bool) {
        (AccControl.Role role, , , , , , ) = accControl.members(_who);
        return role == AccControl.Role.Admin;
    }
}