// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../security/CustomHash.sol";

/**
 * @title Enhanced Access Control for DAO-VC Network
 * @dev Manages roles, permissions, reputation, and validation in the DAO-VC network
 */
contract AccControl is Ownable2Step, Pausable, ReentrancyGuard {
    CustomHash public hasher;
    
    // Enhanced Role System
    enum Role { 
        None,       // Default role
        Investor,   // Can invest in assets
        Developer,  // Can develop and propose updates
        Auditor,    // Can audit contracts and transactions
        DAO,        // DAO node with governance rights
        Validator,  // Transaction validator
        Admin       // Administrative role
    }
    
    // Member Structure
    struct Member {
        Role role;
        uint256 reputation;
        uint256 lastActivity;
        bool isActive;
        uint256 stake;
        uint256 validationCount;
        uint256 successfulValidations;
    }

    // Validator Structure
    struct ValidatorInfo {
        bytes32 hash;
        uint256 stake;
        uint256 validationCount;
        uint256 successfulValidations;
        uint256 lastValidation;
        bool isActive;
    }

    // DAO Node Structure
    struct DAONode {
        uint256 stake;
        uint256 proposalCount;
        uint256 votingPower;
        uint256 lastActivity;
        bool isActive;
    }

    // Constants
    uint256 public constant MIN_VALIDATOR_STAKE = 1000 * 10**18; // 1000 tokens
    uint256 public constant MIN_DAO_STAKE = 5000 * 10**18;      // 5000 tokens
    uint256 public constant REPUTATION_THRESHOLD = 100;          // Minimum reputation for certain actions
    uint256 public constant VALIDATION_REWARD = 10;             // Reputation points for successful validation
    uint256 public constant VALIDATION_PENALTY = 5;             // Penalty for failed validation
    uint256 public constant INACTIVITY_PERIOD = 30 days;        // Maximum period of inactivity

    // Mappings
    mapping(address => Member) public members;
    mapping(address => ValidatorInfo) public validatorInfo;
    mapping(address => DAONode) public daoNodes;
    mapping(bytes32 => bool) public usedHashes;
    
    // Arrays
    address[] public validatorAddresses;
    address[] public daoNodeAddresses;
    
    // Events
    event MemberAdded(address indexed member, Role role, uint256 stake);
    event MemberRemoved(address indexed member, Role role);
    event MemberUpdated(address indexed member, Role role, uint256 newReputation);
    event ValidatorAdded(address indexed validator, bytes32 hash, uint256 stake);
    event ValidatorRemoved(address indexed validator);
    event ValidatorStakeUpdated(address indexed validator, uint256 newStake);
    event DAONodeAdded(address indexed dao, uint256 stake, uint256 votingPower);
    event DAONodeRemoved(address indexed dao);
    event ReputationUpdated(address indexed member, uint256 oldReputation, uint256 newReputation);
    event ValidationPerformed(address indexed validator, bool success);
    event StakeDeposited(address indexed member, uint256 amount);
    event StakeWithdrawn(address indexed member, uint256 amount);

    /**
     * @dev Constructor
     */
    constructor(
        address initialOwner,
        address hasherAddress
    ) {
        require(hasherAddress != address(0), "Invalid hasher address");
        _transferOwnership(initialOwner);
        hasher = CustomHash(hasherAddress);
    }

    /**
     * @dev Modifier to check if caller has sufficient reputation
     */
    modifier sufficientReputation() {
        require(members[msg.sender].reputation >= REPUTATION_THRESHOLD, "Insufficient reputation");
        _;
    }

    /**
     * @dev Modifier to check if caller is active
     */
    modifier onlyActive() {
        require(members[msg.sender].isActive, "Member is not active");
        _;
    }

    /**
     * @dev Add new member with stake
     */
    function addMember(
        address member,
        Role role,
        uint256 initialStake
    ) external onlyOwner whenNotPaused {
        require(role != Role.None, "Invalid role");
        require(members[member].role == Role.None, "Member already exists");
        
        if (role == Role.Validator) {
            require(initialStake >= MIN_VALIDATOR_STAKE, "Insufficient validator stake");
        } else if (role == Role.DAO) {
            require(initialStake >= MIN_DAO_STAKE, "Insufficient DAO stake");
        }

        members[member] = Member({
            role: role,
            reputation: 100,
            lastActivity: block.timestamp,
            isActive: true,
            stake: initialStake,
            validationCount: 0,
            successfulValidations: 0
        });

        if (role == Role.Validator) {
            _addValidator(member, initialStake);
        } else if (role == Role.DAO) {
            _addDAONode(member, initialStake);
        }

        emit MemberAdded(member, role, initialStake);
    }

    /**
     * @dev Internal function to add validator
     */
    function _addValidator(address validator, uint256 stake) internal {
        bytes32 hash = hasher.customHash(
            abi.encodePacked(validator, block.timestamp),
            blockhash(block.number - 1)
        );
        
        require(!usedHashes[hash], "Hash already used");
        
        validatorInfo[validator] = ValidatorInfo({
            hash: hash,
            stake: stake,
            validationCount: 0,
            successfulValidations: 0,
            lastValidation: block.timestamp,
            isActive: true
        });

        validatorAddresses.push(validator);
        usedHashes[hash] = true;
        
        emit ValidatorAdded(validator, hash, stake);
    }

    /**
     * @dev Internal function to add DAO node
     */
    function _addDAONode(address daoNode, uint256 stake) internal {
        daoNodes[daoNode] = DAONode({
            stake: stake,
            proposalCount: 0,
            votingPower: _calculateVotingPower(stake),
            lastActivity: block.timestamp,
            isActive: true
        });

        daoNodeAddresses.push(daoNode);
        
        emit DAONodeAdded(daoNode, stake, daoNodes[daoNode].votingPower);
    }

    /**
     * @dev Calculate voting power based on stake and reputation
     */
    function _calculateVotingPower(uint256 stake) internal pure returns (uint256) {
        return (stake * 100) / MIN_DAO_STAKE;
    }

    /**
     * @dev Update member's reputation
     */
    function updateReputation(
        address member,
        uint256 reputationChange,
        bool isIncrease
    ) external onlyOwner whenNotPaused {
        Member storage memberData = members[member];
        require(memberData.isActive, "Member is not active");

        uint256 oldReputation = memberData.reputation;
        
        if (isIncrease) {
            memberData.reputation += reputationChange;
        } else {
            if (reputationChange >= memberData.reputation) {
                memberData.reputation = 0;
            } else {
                memberData.reputation -= reputationChange;
            }
        }

        emit ReputationUpdated(member, oldReputation, memberData.reputation);
    }

    /**
     * @dev Record successful validation
     */
    function recordValidation(
        address validator,
        bool success
    ) external onlyOwner whenNotPaused {
        require(validatorInfo[validator].isActive, "Validator not active");
        
        ValidatorInfo storage vInfo = validatorInfo[validator];
        Member storage memberData = members[validator];
        
        vInfo.validationCount++;
        memberData.validationCount++;
        
        if (success) {
            vInfo.successfulValidations++;
            memberData.successfulValidations++;
            memberData.reputation += VALIDATION_REWARD;
        } else {
            if (memberData.reputation >= VALIDATION_PENALTY) {
                memberData.reputation -= VALIDATION_PENALTY;
            }
        }
        
        vInfo.lastValidation = block.timestamp;
        memberData.lastActivity = block.timestamp;
        
        emit ValidationPerformed(validator, success);
    }

    /**
     * @dev Check member activity and deactivate if inactive
     */
    function checkActivity(address member) external onlyOwner {
        Member storage memberData = members[member];
        require(memberData.isActive, "Member already inactive");
        
        if (block.timestamp - memberData.lastActivity > INACTIVITY_PERIOD) {
            memberData.isActive = false;
            
            if (memberData.role == Role.Validator) {
                validatorInfo[member].isActive = false;
            } else if (memberData.role == Role.DAO) {
                daoNodes[member].isActive = false;
            }
            
            emit MemberRemoved(member, memberData.role);
        }
    }

    /**
     * @dev Get validator performance metrics
     */
    function getValidatorMetrics(
        address validator
    ) external view returns (
        uint256 validationCount,
        uint256 successRate,
        uint256 reputation,
        uint256 stake
    ) {
        ValidatorInfo storage vInfo = validatorInfo[validator];
        Member storage memberData = members[validator];
        
        validationCount = vInfo.validationCount;
        successRate = vInfo.validationCount > 0 ? 
            (vInfo.successfulValidations * 100) / vInfo.validationCount : 0;
        reputation = memberData.reputation;
        stake = vInfo.stake;
    }

    /**
     * @dev Get DAO node details
     */
    function getDAONodeDetails(
        address daoNode
    ) external view returns (
        uint256 stake,
        uint256 votingPower,
        uint256 proposalCount,
        bool isActive
    ) {
        DAONode storage node = daoNodes[daoNode];
        return (
            node.stake,
            node.votingPower,
            node.proposalCount,
            node.isActive
        );
    }

    /**
     * @dev Pause contract
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}