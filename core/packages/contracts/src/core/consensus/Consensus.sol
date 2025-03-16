// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../permission/AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "../security/CustomHash.sol"; // اتصال به تابع هش اختصاصی

/**
 * @title Enhanced Consensus Mechanism
 * @dev Hybrid consensus mechanism combining PoA + dPoS + PoP + AI
 */
contract Consensus is Ownable2Step, Pausable, ReentrancyGuard {
    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // ساختار Validator شامل آدرس، مقدار استیک، اعتبار، تعداد مشارکت و وضعیت فعال بودن
    struct Validator {
        address validatorAddress;
        uint256 stake;
        uint256 reputation;
        uint256 participationCount;
        uint256 successfulValidations;
        uint256 failedValidations;
        uint256 lastValidation;
        uint256 rewardsClaimed;
        uint256 slashCount;
        bool isActive;
        ValidationStats stats;
    }

    // نگاشت برای ذخیره Validatorها
    mapping(address => Validator) public validators;
    address[] public validatorList; // لیست آدرس‌های Validatorها
    uint256 public requiredReputation = 100; // اعتبار مورد نیاز برای Validatorها
    uint256 public minParticipation = 10; // حداقل تعداد مشارکت برای حفظ اعتبار

    // رویدادها برای ثبت تغییرات در قرارداد
    event ValidatorAdded(address indexed validator, uint256 stake, uint256 timestamp);
    event ValidatorRemoved(address indexed validator, string reason);
    event ValidationRoundStarted(bytes32 indexed roundId, uint256 startTime, uint256 requiredValidations);
    event ValidationSubmitted(bytes32 indexed roundId, address indexed validator, bytes32 result);
    event ConsensusReached(bytes32 indexed roundId, bytes32 result, uint256 timestamp);
    event ReputationUpdated(address indexed validator, uint256 oldReputation, uint256 newReputation);
    event RewardsClaimed(address indexed validator, uint256 amount);
    event ValidatorSlashed(address indexed validator, uint256 amount, string reason);
    event EpochUpdated(uint256 indexed epoch, uint256 timestamp);
    event AIModelUpdated(string modelVersion, uint256 timestamp);
    event ValidationStatsUpdated(address indexed validator, uint256 accuracyRate, uint256 consistencyScore);

    // Validation Statistics
    struct ValidationStats {
        uint256 avgResponseTime;
        uint256 accuracyRate;
        uint256 consistencyScore;
        uint256 aiConfidenceScore;
        uint256 lastUpdateBlock;
    }

    // Consensus Parameters
    struct ConsensusParams {
        uint256 minValidators;
        uint256 maxValidators;
        uint256 validationThreshold;
        uint256 minStake;
        uint256 rewardRate;
        uint256 slashRate;
        uint256 validationTimeout;
        uint256 epochDuration;
    }

    // Validation Round
    struct ValidationRound {
        bytes32 dataHash;
        uint256 startTime;
        uint256 endTime;
        uint256 requiredValidations;
        uint256 validationCount;
        mapping(address => bool) hasValidated;
        mapping(address => bytes32) validationResults;
        bool isComplete;
        bool consensus;
    }

    // State Variables
    mapping(bytes32 => ValidationRound) public validationRounds;
    mapping(address => uint256) public validatorRewards;
    mapping(uint256 => bytes32[]) public epochValidations;
    
    ConsensusParams public params;  // پارامترهای اجماع
    uint256 public currentEpoch;
    uint256 public lastEpochUpdate;
    uint256 public totalStaked;

    /**
     * @dev سازنده قرارداد
     * @param _accControl آدرس قرارداد AccControl
     * @param _hasher آدرس قرارداد تابع هش
     * @param initialOwner آدرس مالک اولیه
     * @param _params آرامس قرارداد
     */
    constructor(
        address _accControl,
        address _hasher,
        address initialOwner,
        ConsensusParams memory _params
    ) {
        require(_accControl != address(0), "Invalid AccControl address");
        require(_hasher != address(0), "Invalid CustomHash address");
        require(initialOwner != address(0), "Invalid owner address");
        
        _transferOwnership(initialOwner);
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);
        params = _params;
        
        currentEpoch = 1;
        lastEpochUpdate = block.timestamp;
    }

    /**
     * @dev Modifier برای اطمینان از اینکه تنها Validatorهای فعال می‌توانند عمل انجام دهند
     */
    modifier onlyValidator() {
        require(validators[msg.sender].isActive, "Not an active validator");
        require(validators[msg.sender].reputation >= requiredReputation, "Insufficient reputation");
        require(validators[msg.sender].stake >= params.minStake, "Insufficient stake");
        _;
    }

    /**
     * @dev افزودن Validator جدید به قرارداد
     * @param validatorAddress آدرس Validator جدید
     * @param stake مقدار استیک Validator
     */
    function addValidator(
        address validatorAddress,
        uint256 stake
    ) external whenNotPaused {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Admin, "Not authorized");
        require(validatorAddress != address(0), "Invalid address");
        require(!validators[validatorAddress].isActive, "Already exists");
        require(stake >= params.minStake, "Insufficient stake");
        require(validatorList.length < params.maxValidators, "Max validators reached");

        ValidationStats memory stats = ValidationStats({
            avgResponseTime: 0,
            accuracyRate: 100,
            consistencyScore: 100,
            aiConfidenceScore: 100,
            lastUpdateBlock: block.number
        });

        validators[validatorAddress] = Validator({
            validatorAddress: validatorAddress,
            stake: stake,
            reputation: 100,
            participationCount: 0,
            successfulValidations: 0,
            failedValidations: 0,
            lastValidation: block.timestamp,
            rewardsClaimed: 0,
            slashCount: 0,
            isActive: true,
            stats: stats
        });

        validatorList.push(validatorAddress);
        totalStaked += stake;

        emit ValidatorAdded(validatorAddress, stake, block.timestamp);
    }

    /**
     * @dev حذف Validator موجود از قرارداد
     * @param validatorAddress آدرس Validator
     */
    function removeValidator(address validatorAddress) external onlyOwner {
        require(validatorAddress != address(0), "Invalid validator address");
        require(validators[validatorAddress].isActive, "Validator not found");
        validators[validatorAddress].isActive = false;
        emit ValidatorRemoved(validatorAddress, "Validator removed");
    }

    /**
     * @dev تایید تراکنش توسط Validator
     * @param transactionHash هش تراکنش
     */
    function validateTransaction(bytes32 transactionHash) external onlyValidator {
        require(transactionHash != bytes32(0), "Invalid transaction hash");
        validators[msg.sender].participationCount++;
        adjustReputation(msg.sender, true);
    }

    /**
     * @dev تنظیم اعتبار Validator بر اساس مشارکت
     * @param validator آدرس Validator
     * @param participated وضعیت مشارکت Validator
     */
    function adjustReputation(address validator, bool participated) internal {
        require(validator != address(0), "Invalid validator address");
        if (participated) {
            validators[validator].reputation += 2;
        } else if (validators[validator].participationCount < minParticipation) {
            validators[validator].reputation = validators[validator].reputation > 0 ? validators[validator].reputation - 1 : 0;
        }
    }

    /**
     * @dev Start new validation round
     */
    function startValidationRound(
        bytes32 dataHash,
        uint256 duration
    ) external whenNotPaused {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Admin, "Not authorized");
        require(duration > 0 && duration <= params.validationTimeout, "Invalid duration");

        ValidationRound storage round = validationRounds[dataHash];
        require(round.startTime == 0, "Round already exists");

        round.dataHash = dataHash;
        round.startTime = block.timestamp;
        round.endTime = block.timestamp + duration;
        round.requiredValidations = _calculateRequiredValidations();
        round.isComplete = false;
        round.consensus = false;

        epochValidations[currentEpoch].push(dataHash);

        emit ValidationRoundStarted(dataHash, block.timestamp, round.requiredValidations);
    }

    /**
     * @dev Submit validation result
     */
    function submitValidation(
        bytes32 roundId,
        bytes32 result
    ) external whenNotPaused onlyValidator nonReentrant {
        ValidationRound storage round = validationRounds[roundId];
        require(block.timestamp >= round.startTime, "Round not started");
        require(block.timestamp <= round.endTime, "Round ended");
        require(!round.hasValidated[msg.sender], "Already validated");

        round.hasValidated[msg.sender] = true;
        round.validationResults[msg.sender] = result;
        round.validationCount++;

        validators[msg.sender].participationCount++;
        validators[msg.sender].lastValidation = block.timestamp;

        emit ValidationSubmitted(roundId, msg.sender, result);

        if (round.validationCount >= round.requiredValidations) {
            _finalizeRound(roundId);
        }
    }

    /**
     * @dev Internal function to finalize validation round
     */
    function _finalizeRound(bytes32 roundId) internal {
        ValidationRound storage round = validationRounds[roundId];
        require(!round.isComplete, "Round already finalized");

        bytes32 consensusResult = _calculateConsensus(roundId);
        round.isComplete = true;
        round.consensus = true;

        // Update validator statistics
        address[] memory roundValidators = _getRoundValidators(roundId);
        for (uint256 i = 0; i < roundValidators.length; i++) {
            address validator = roundValidators[i];
            if (round.validationResults[validator] == consensusResult) {
                _updateValidatorStats(validator, true);
                _distributeRewards(validator);
            } else {
                _updateValidatorStats(validator, false);
                _slashValidator(validator, "Incorrect validation");
            }
        }

        emit ConsensusReached(roundId, consensusResult, block.timestamp);
    }

    /**
     * @dev Calculate consensus result using AI confidence scores
     */
    function _calculateConsensus(bytes32 roundId) internal view returns (bytes32) {
        ValidationRound storage round = validationRounds[roundId];
        address[] memory roundValidators = _getRoundValidators(roundId);
        
        uint256 highestConfidence = 0;
        bytes32 consensusResult;

        for (uint256 i = 0; i < roundValidators.length; i++) {
            address validator = roundValidators[i];
            uint256 confidence = validators[validator].stats.aiConfidenceScore;
            
            if (confidence > highestConfidence) {
                highestConfidence = confidence;
                consensusResult = round.validationResults[validator];
            }
        }

        return consensusResult;
    }

    /**
     * @dev Update validator statistics
     */
    function _updateValidatorStats(
        address validator,
        bool successful
    ) internal {
        Validator storage v = validators[validator];
        ValidationStats storage stats = v.stats;

        if (successful) {
            v.successfulValidations++;
            stats.accuracyRate = (stats.accuracyRate * 95 + 500) / 100;
            stats.consistencyScore = (stats.consistencyScore * 95 + 500) / 100;
        } else {
            v.failedValidations++;
            stats.accuracyRate = (stats.accuracyRate * 95) / 100;
            stats.consistencyScore = (stats.consistencyScore * 95) / 100;
        }

        stats.lastUpdateBlock = block.number;
        
        emit ValidationStatsUpdated(validator, stats.accuracyRate, stats.consistencyScore);
    }

    /**
     * @dev Distribute rewards to validator
     */
    function _distributeRewards(address validator) internal {
        uint256 reward = (validators[validator].stake * params.rewardRate) / 10000;
        validatorRewards[validator] += reward;
        validators[validator].rewardsClaimed += reward;
        
        emit RewardsClaimed(validator, reward);
    }

    /**
     * @dev Slash validator for incorrect validation
     */
    function _slashValidator(
        address validator,
        string memory reason
    ) internal {
        uint256 slashAmount = (validators[validator].stake * params.slashRate) / 10000;
        validators[validator].stake -= slashAmount;
        validators[validator].slashCount++;
        totalStaked -= slashAmount;

        if (validators[validator].stake < params.minStake) {
            validators[validator].isActive = false;
        }

        emit ValidatorSlashed(validator, slashAmount, reason);
    }

    /**
     * @dev Calculate required validations based on active validators
     */
    function _calculateRequiredValidations() internal view returns (uint256) {
        uint256 activeValidators = 0;
        for (uint256 i = 0; i < validatorList.length; i++) {
            if (validators[validatorList[i]].isActive) {
                activeValidators++;
            }
        }
        return (activeValidators * params.validationThreshold) / 100;
    }

    /**
     * @dev Get validators who participated in a round
     */
    function _getRoundValidators(
        bytes32 roundId
    ) internal view returns (address[] memory) {
        ValidationRound storage round = validationRounds[roundId];
        uint256 count = 0;
        
        // First pass: count valid validators
        for (uint256 i = 0; i < validatorList.length; i++) {
            if (round.hasValidated[validatorList[i]]) {
                count++;
            }
        }

        // Second pass: build array
        address[] memory roundValidators = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < validatorList.length; i++) {
            if (round.hasValidated[validatorList[i]]) {
                roundValidators[index] = validatorList[i];
                index++;
            }
        }

        return roundValidators;
    }

    /**
     * @dev Update consensus parameters
     */
    function updateConsensusParams(
        ConsensusParams memory newParams
    ) external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        params = newParams;
    }

    /**
     * @dev Update AI model version
     */
    function updateAIModel(
        string memory modelVersion
    ) external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        emit AIModelUpdated(modelVersion, block.timestamp);
    }

    /**
     * @dev Get validator details
     */
    function getValidatorDetails(
        address validator
    ) external view returns (
        uint256 stake,
        uint256 reputation,
        uint256 participationCount,
        uint256 successRate,
        ValidationStats memory stats
    ) {
        Validator storage v = validators[validator];
        uint256 totalValidations = v.successfulValidations + v.failedValidations;
        successRate = totalValidations > 0 ? 
            (v.successfulValidations * 100) / totalValidations : 0;

        return (
            v.stake,
            v.reputation,
            v.participationCount,
            successRate,
            v.stats
        );
    }

    /**
     * @dev Get validation round details
     */
    function getValidationRound(
        bytes32 roundId
    ) external view returns (
        uint256 startTime,
        uint256 endTime,
        uint256 requiredValidations,
        uint256 validationCount,
        bool isComplete,
        bool consensus
    ) {
        ValidationRound storage round = validationRounds[roundId];
        return (
            round.startTime,
            round.endTime,
            round.requiredValidations,
            round.validationCount,
            round.isComplete,
            round.consensus
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