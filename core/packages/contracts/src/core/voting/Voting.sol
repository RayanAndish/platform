// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable2Step.sol"; // اتصال به قرارداد Ownable2Step از OpenZeppelin
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../permission/AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "../security/CustomHash.sol"; // اتصال به قرارداد CustomHash برای هش کردن اطلاعات

/**
 * @title Enhanced Voting System for DAO-VC
 * @dev Advanced voting mechanism with quadratic voting, delegation, and AI-assisted validation
 */
contract Voting is Ownable2Step, Pausable, ReentrancyGuard {
    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // Proposal Types
    enum ProposalType {
        STANDARD,       // Standard proposal
        EMERGENCY,      // Emergency proposal with shorter voting period
        GOVERNANCE,     // Governance changes
        FINANCIAL,      // Financial decisions
        TECHNICAL      // Technical updates
    }

    // Proposal Status
    enum ProposalStatus {
        PENDING,        // Waiting for votes
        ACTIVE,         // Active for voting
        APPROVED,       // Approved by voters
        REJECTED,       // Rejected by voters
        EXECUTED,       // Executed successfully
        FAILED,         // Execution failed
        CANCELLED      // Cancelled by creator
    }

    // Vote Type
    enum VoteType {
        NONE,          // No vote
        FOR,           // Vote for
        AGAINST,       // Vote against
        ABSTAIN       // Abstain from voting
    }

    // ساختار Proposal شامل شناسه، توضیحات، تعداد آراء موافق، تعداد آراء مخالف، تعداد کل آراء، وضعیت و هش
    struct Proposal {
        uint256 id;
        string title;
        string description;
        address creator;
        uint256 startTime;
        uint256 endTime;
        uint256 executionDelay;
        ProposalType proposalType;
        ProposalStatus status;
        bytes32 hash;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 votesAbstain;
        uint256 quorumRequired;
        mapping(address => Vote) votes;
        mapping(bytes32 => bool) executionHashes;
        bool isQuadratic;
        VotingStrategy strategy;
    }

    // Vote Structure
    struct Vote {
        VoteType voteType;
        uint256 weight;
        uint256 timestamp;
        string justification;
        bool hasVoted;
    }

    // Voting Strategy
    struct VotingStrategy {
        uint256 quorumPercentage;
        uint256 minVotingPeriod;
        uint256 maxVotingPeriod;
        uint256 executionDelay;
        uint256 minVotingPower;
        bool requiresAIValidation;
    }

    // Delegation Info
    struct DelegationInfo {
        address delegate;
        uint256 power;
        uint256 expiry;
        bool active;
    }

    // State Variables
    uint256 public proposalCount; // شمارنده پیشنهادات
    uint256 public constant MAX_VOTING_POWER = 10000;
    uint256 public constant MIN_PROPOSAL_DURATION = 1 days;
    uint256 public constant MAX_PROPOSAL_DURATION = 30 days;
    uint256 public constant VOTE_PRECISION = 1e18;
    uint256 public reputationThreshold = 100; // حداقل امتیاز اعتبار مورد نیاز برای رأی دادن

    // Mappings
    mapping(uint256 => Proposal) public proposals; // نگاشت برای ذخیره‌سازی پیشنهادات
    mapping(bytes32 => bool) public proposalHashes; // نگاشت برای پیگیری هش پیشنهادات به منظور جلوگیری از پیشنهادات تکراری
    mapping(address => uint256) public votingPower;
    mapping(address => DelegationInfo) public delegations;
    mapping(ProposalType => VotingStrategy) public votingStrategies;
    mapping(address => uint256) public lastVoteTime;
    mapping(address => uint256) public reputationScore; // ذخیره امتیاز Validators

    // رویدادها برای ثبت تغییرات در قرارداد
    event ProposalCreated(uint256 indexed proposalId, string title, address indexed creator, ProposalType proposalType);
    event ProposalActivated(uint256 indexed proposalId, uint256 startTime, uint256 endTime);
    event ProposalCancelled(uint256 indexed proposalId, string reason);
    event ProposalExecuted(uint256 indexed proposalId, bool success);
    event VoteCast(uint256 indexed proposalId, address indexed voter, VoteType voteType, uint256 weight);
    event VotingPowerDelegated(address indexed delegator, address indexed delegate, uint256 power, uint256 expiry);
    event VotingStrategyUpdated(ProposalType indexed proposalType, uint256 quorum, uint256 minPeriod);
    event ReputationUpdated(address indexed voter, uint256 oldScore, uint256 newScore);
    event AIValidationResult(uint256 indexed proposalId, bool validated, string reason);

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

        // Initialize default voting strategies
        _initializeVotingStrategies();
    }

    /**
     * @dev Initialize default voting strategies
     */
    function _initializeVotingStrategies() internal {
        // Standard proposals
        votingStrategies[ProposalType.STANDARD] = VotingStrategy({
            quorumPercentage: 50,
            minVotingPeriod: 7 days,
            maxVotingPeriod: 14 days,
            executionDelay: 2 days,
            minVotingPower: 100,
            requiresAIValidation: false
        });

        // Emergency proposals
        votingStrategies[ProposalType.EMERGENCY] = VotingStrategy({
            quorumPercentage: 75,
            minVotingPeriod: 1 days,
            maxVotingPeriod: 3 days,
            executionDelay: 6 hours,
            minVotingPower: 500,
            requiresAIValidation: true
        });

        // Governance proposals
        votingStrategies[ProposalType.GOVERNANCE] = VotingStrategy({
            quorumPercentage: 66,
            minVotingPeriod: 14 days,
            maxVotingPeriod: 30 days,
            executionDelay: 5 days,
            minVotingPower: 1000,
            requiresAIValidation: true
        });

        // Financial proposals
        votingStrategies[ProposalType.FINANCIAL] = VotingStrategy({
            quorumPercentage: 75,
            minVotingPeriod: 10 days,
            maxVotingPeriod: 20 days,
            executionDelay: 3 days,
            minVotingPower: 750,
            requiresAIValidation: true
        });

        // Technical proposals
        votingStrategies[ProposalType.TECHNICAL] = VotingStrategy({
            quorumPercentage: 60,
            minVotingPeriod: 5 days,
            maxVotingPeriod: 10 days,
            executionDelay: 2 days,
            minVotingPower: 250,
            requiresAIValidation: false
        });
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
     * @param title عنوان پیشنهاد
     * @param description توضیحات پیشنهاد
     * @param proposalType نوع پیشنهاد
     * @param votingPeriod دوره رأی
     * @param isQuadratic آیا رأی به صورت دوجهانی است
     */
    function createProposal(
        string memory title,
        string memory description,
        ProposalType proposalType,
        uint256 votingPeriod,
        bool isQuadratic
    ) external whenNotPaused nonReentrant {
        require(accControl.isDAONode(msg.sender), "Not authorized");
        require(bytes(title).length > 0, "Empty title");
        require(bytes(description).length > 0, "Empty description");
        
        VotingStrategy memory strategy = votingStrategies[proposalType];
        require(votingPeriod >= strategy.minVotingPeriod, "Voting period too short");
        require(votingPeriod <= strategy.maxVotingPeriod, "Voting period too long");

        bytes32 proposalHash = hasher.customHash(
            abi.encodePacked(title, description, msg.sender, block.timestamp),
            keccak256("createProposal")
        );
        require(!proposalHashes[proposalHash], "Duplicate proposal");

        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.title = title;
        newProposal.description = description;
        newProposal.creator = msg.sender;
        newProposal.startTime = block.timestamp;
        newProposal.endTime = block.timestamp + votingPeriod;
        newProposal.executionDelay = strategy.executionDelay;
        newProposal.proposalType = proposalType;
        newProposal.status = ProposalStatus.ACTIVE;
        newProposal.hash = proposalHash;
        newProposal.quorumRequired = strategy.quorumPercentage;
        newProposal.isQuadratic = isQuadratic;
        newProposal.strategy = strategy;

        proposalHashes[proposalHash] = true;

        emit ProposalCreated(proposalCount, title, msg.sender, proposalType);
        emit ProposalActivated(proposalCount, block.timestamp, newProposal.endTime);
    }

    /**
     * @dev رأی دادن به یک پیشنهاد
     * @param proposalId شناسه پیشنهاد
     * @param voteType نوع رأی
     * @param justification توضیحات رأی
     */
    function castVote(
        uint256 proposalId,
        VoteType voteType,
        string memory justification
    ) external whenNotPaused nonReentrant {
        require(accControl.isValidator(msg.sender), "Not a validator");
        
        Proposal storage proposal = proposals[proposalId];
        require(proposal.status == ProposalStatus.ACTIVE, "Proposal not active");
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!proposal.votes[msg.sender].hasVoted, "Already voted");

        uint256 weight = _calculateVoteWeight(msg.sender, proposal.isQuadratic);
        require(weight >= proposal.strategy.minVotingPower, "Insufficient voting power");

        // Record vote
        proposal.votes[msg.sender] = Vote({
            voteType: voteType,
            weight: weight,
            timestamp: block.timestamp,
            justification: justification,
            hasVoted: true
        });

        // Update vote counts
        if (voteType == VoteType.FOR) {
            proposal.votesFor += weight;
        } else if (voteType == VoteType.AGAINST) {
            proposal.votesAgainst += weight;
        } else if (voteType == VoteType.ABSTAIN) {
            proposal.votesAbstain += weight;
        }

        // Update reputation
        _updateReputation(msg.sender, true);
        
        emit VoteCast(proposalId, msg.sender, voteType, weight);

        // Check if proposal can be finalized
        if (_canBeFinalized(proposal)) {
            _finalizeProposal(proposalId);
        }
    }

    /**
     * @dev Calculate vote weight considering quadratic voting if enabled
     */
    function _calculateVoteWeight(
        address voter,
        bool isQuadratic
    ) internal view returns (uint256) {
        uint256 baseWeight = votingPower[voter];
        
        if (delegations[voter].active) {
            require(block.timestamp < delegations[voter].expiry, "Delegation expired");
            baseWeight += delegations[voter].power;
        }

        if (isQuadratic) {
            return _sqrt(baseWeight);
        }
        return baseWeight;
    }

    /**
     * @dev Square root function for quadratic voting
     */
    function _sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    /**
     * @dev Check if proposal can be finalized
     */
    function _canBeFinalized(
        Proposal storage proposal
    ) internal view returns (bool) {
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
        uint256 totalValidators = accControl.validatorCount();
        uint256 quorum = (totalValidators * proposal.quorumRequired) / 100;
        
        return totalVotes >= quorum;
    }

    /**
     * @dev Finalize a proposal
     */
    function _finalizeProposal(uint256 proposalId) internal {
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.votesFor > proposal.votesAgainst) {
            proposal.status = ProposalStatus.APPROVED;
        } else {
            proposal.status = ProposalStatus.REJECTED;
        }

        emit ProposalExecuted(proposalId, proposal.status == ProposalStatus.APPROVED);
    }

    /**
     * @dev Delegate voting power
     */
    function delegateVotingPower(
        address delegate,
        uint256 power,
        uint256 duration
    ) external whenNotPaused {
        require(delegate != address(0), "Invalid delegate");
        require(delegate != msg.sender, "Cannot self delegate");
        require(power > 0 && power <= votingPower[msg.sender], "Invalid power");
        require(duration >= 1 days && duration <= 365 days, "Invalid duration");

        delegations[msg.sender] = DelegationInfo({
            delegate: delegate,
            power: power,
            expiry: block.timestamp + duration,
            active: true
        });

        votingPower[msg.sender] -= power;
        votingPower[delegate] += power;

        emit VotingPowerDelegated(msg.sender, delegate, power, block.timestamp + duration);
    }

    /**
     * @dev Update reputation score
     */
    function _updateReputation(
        address voter,
        bool participated
    ) internal {
        uint256 oldScore = reputationScore[voter];
        
        if (participated) {
            reputationScore[voter] += 2;
        } else {
            reputationScore[voter] = reputationScore[voter] > 0 ? reputationScore[voter] - 1 : 0;
        }

        emit ReputationUpdated(voter, oldScore, reputationScore[voter]);
    }

    /**
     * @dev Get proposal details
     */
    function getProposalDetails(
        uint256 proposalId
    ) external view returns (
        string memory title,
        string memory description,
        address creator,
        uint256 startTime,
        uint256 endTime,
        ProposalType proposalType,
        ProposalStatus status,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 votesAbstain
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.title,
            proposal.description,
            proposal.creator,
            proposal.startTime,
            proposal.endTime,
            proposal.proposalType,
            proposal.status,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.votesAbstain
        );
    }

    /**
     * @dev Get vote details
     */
    function getVoteDetails(
        uint256 proposalId,
        address voter
    ) external view returns (
        VoteType voteType,
        uint256 weight,
        uint256 timestamp,
        string memory justification
    ) {
        Vote storage vote = proposals[proposalId].votes[voter];
        return (
            vote.voteType,
            vote.weight,
            vote.timestamp,
            vote.justification
        );
    }

    /**
     * @dev Update voting strategy
     */
    function updateVotingStrategy(
        ProposalType proposalType,
        VotingStrategy memory newStrategy
    ) external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        require(newStrategy.quorumPercentage <= 100, "Invalid quorum");
        require(newStrategy.minVotingPeriod <= newStrategy.maxVotingPeriod, "Invalid periods");

        votingStrategies[proposalType] = newStrategy;
        
        emit VotingStrategyUpdated(
            proposalType,
            newStrategy.quorumPercentage,
            newStrategy.minVotingPeriod
        );
    }

    /**
     * @dev Pause contract
     */
    function pause() external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        _unpause();
    }
}