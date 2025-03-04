// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol"; // اتصال به قرارداد Ownable از OpenZeppelin
import "./AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "./CustomHash.sol"; // اتصال به قرارداد CustomHash برای هش کردن اطلاعات

/**
 * @title Voting
 * @dev مدیریت رأی‌گیری برای تصمیم‌گیری‌های DAO-VC با الگوریتم ترکیبی PoA + dPoS + PoP + AI
 */
contract Voting is Ownable {
    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // وضعیت‌های مختلف پیشنهاد
    enum ProposalStatus { Pending, Approved, Rejected }

    // ساختار Proposal شامل شناسه، توضیحات، تعداد آراء موافق، تعداد آراء مخالف، تعداد کل آراء، وضعیت و هش
    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCountYes;
        uint256 voteCountNo;
        uint256 totalVotes;
        ProposalStatus status;
        bytes32 hash;
        mapping(address => bool) hasVoted; // نگاشت برای پیگیری آراء اعضا
    }

    uint256 public proposalCount; // شمارنده پیشنهادات
    uint256 public requiredQuorumPercentage = 50; // حداقل درصد رأی مثبت برای تأیید
    uint256 public reputationThreshold = 10; // حداقل امتیاز برای اعتبارسنجی PoA
    mapping(uint256 => Proposal) public proposals; // نگاشت برای ذخیره‌سازی پیشنهادات
    mapping(bytes32 => bool) public proposalHashes; // نگاشت برای پیگیری هش پیشنهادات به منظور جلوگیری از پیشنهادات تکراری
    mapping(address => uint256) public reputationScore; // ذخیره امتیاز Validators

    // رویدادها برای ثبت تغییرات در قرارداد
    event ProposalCreated(uint256 indexed proposalId, string description, bytes32 hash);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support, bytes32 hash);
    event ProposalFinalized(uint256 indexed proposalId, ProposalStatus status);
    event ReputationAdjusted(address indexed validator, uint256 newReputation);

    /**
     * @dev سازنده قرارداد
     * @param initialOwner آدرس مالک اولیه
     * @param _accControl آدرس قرارداد AccControl
     * @param _hasher آدرس قرارداد تابع هش
     */
    constructor(address initialOwner, address _accControl, address _hasher) Ownable(initialOwner) {
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);
    }

    /**
     * @dev Modifier برای اطمینان از اینکه تنها اعضای DAO می‌توانند پیشنهادات ایجاد کنند
     */
    modifier onlyDAOMember() {
        require(accControl.isDAONode(msg.sender), "Only DAO members can create proposals");
        _;
    }

    /**
     * @dev Modifier برای اطمینان از اینکه تنها اعتبارسنج‌های واجد شرایط می‌توانند رأی دهند
     */
    modifier onlyQualifiedValidator() {
        require(accControl.isValidator(msg.sender), "Only validators can vote");
        require(reputationScore[msg.sender] >= reputationThreshold, "Validator reputation too low");
        _;
    }

    /**
     * @dev ایجاد پیشنهاد جدید
     * @param description توضیحات پیشنهاد
     */
    function createProposal(string memory description) external onlyDAOMember {
        proposalCount++;
        bytes32 proposalHash = hasher.customHash(abi.encodePacked(description, msg.sender, block.timestamp), keccak256(abi.encodePacked("createProposal")));
        require(!proposalHashes[proposalHash], "Duplicate proposal detected");

        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.description = description;
        newProposal.voteCountYes = 0;
        newProposal.voteCountNo = 0;
        newProposal.totalVotes = 0;
        newProposal.status = ProposalStatus.Pending;
        newProposal.hash = proposalHash;
        proposalHashes[proposalHash] = true;

        emit ProposalCreated(proposalCount, description, proposalHash);
    }

    /**
     * @dev رأی دادن به یک پیشنهاد
     * @param proposalId شناسه پیشنهاد
     * @param support رأی موافق یا مخالف
     */
    function vote(uint256 proposalId, bool support) external onlyQualifiedValidator {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.hasVoted[msg.sender], "Validator has already voted");
        require(proposal.status == ProposalStatus.Pending, "Voting is closed for this proposal");
        bytes32 voteHash = hasher.customHash(abi.encodePacked(proposalId, msg.sender, support, block.timestamp), keccak256(abi.encodePacked("vote")));

        if (support) {
            proposal.voteCountYes++;
        } else {
            proposal.voteCountNo++;
        }
        proposal.totalVotes++;
        proposal.hasVoted[msg.sender] = true;

        adjustReputation(msg.sender, true); // افزایش امتیاز اعتبارسنجی برای مشارکت
        emit Voted(proposalId, msg.sender, support, voteHash);
    }

    /**
     * @dev نهایی کردن یک پیشنهاد پس از پایان دوره رأی‌گیری
     * @param proposalId شناسه پیشنهاد
     */
    function finalizeProposal(uint256 proposalId) external onlyDAOMember {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.status == ProposalStatus.Pending, "Proposal already finalized");
        uint256 totalValidators = accControl.validatorCount(); // تعداد کل اعتبارسنج‌ها
        require(proposal.totalVotes >= (totalValidators * requiredQuorumPercentage) / 100, "Not enough votes to finalize");

        if (proposal.voteCountYes > proposal.voteCountNo) {
            proposal.status = ProposalStatus.Approved;
        } else {
            proposal.status = ProposalStatus.Rejected;
        }

        emit ProposalFinalized(proposalId, proposal.status);
    }

    /**
     * @dev تنظیم امتیاز اعتبارسنجی
     * @param validator آدرس اعتبارسنج
     * @param participated وضعیت مشارکت
     */
    function adjustReputation(address validator, bool participated) internal {
        if (participated) {
            reputationScore[validator] += 2; // افزایش امتیاز برای مشارکت
        } else {
            reputationScore[validator] = reputationScore[validator] > 0 ? reputationScore[validator] - 1 : 0; // کاهش امتیاز در صورت عدم فعالیت
        }
        emit ReputationAdjusted(validator, reputationScore[validator]);
    }
}