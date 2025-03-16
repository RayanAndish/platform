// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title Enhanced Staking Contract for DAO-VC Asset Platform
 * @notice This contract handles the staking mechanism with tier-based system
 * @dev Supports multiple tiers (Bronze, Silver, Gold, Diamond) with different benefits
 */
contract Staking is ReentrancyGuard, Pausable, AccessControl {
    using Math for uint256;

    // Tier Levels
    enum StakingTier { NONE, BRONZE, SILVER, GOLD, DIAMOND }

    // Tier Configuration
    struct TierConfig {
        uint256 minStakeAmount;    // Minimum amount required for this tier
        uint256 rewardMultiplier;  // Reward multiplier (base 100)
        uint256 votingPower;       // Voting power for this tier
        uint256 lockPeriod;        // Lock period in days
    }

    // State variables
    IERC20 public stakingToken;
    uint256 public totalStaked;
    uint256 public baseRewardRate; // Base rewards per second
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    
    // Constants
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    uint256 public constant REWARD_PRECISION = 1e18;
    uint256 public constant MAX_STAKE_AMOUNT = 1_000_000 * 1e18; // 1 million tokens maximum

    // Tier configurations
    mapping(StakingTier => TierConfig) public tierConfigs;
    
    // User data
    mapping(address => uint256) public stakedBalance;
    mapping(address => StakingTier) public userTier;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public lastStakeTime;

    // Events
    event Staked(address indexed user, uint256 amount, StakingTier tier);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    event TierUpgraded(address indexed user, StakingTier oldTier, StakingTier newTier);
    event TierConfigUpdated(StakingTier tier, uint256 minStake, uint256 multiplier, uint256 votingPower, uint256 lockPeriod);

    /**
     * @dev Constructor
     * @param _stakingToken Address of the ERC20 token used for staking
     * @param _baseRewardRate Initial base reward rate per second
     */
    constructor(
        address _stakingToken,
        uint256 _baseRewardRate
    ) {
        require(_stakingToken != address(0), "Invalid token address");
        require(_baseRewardRate > 0, "Invalid reward rate");

        stakingToken = IERC20(_stakingToken);
        baseRewardRate = _baseRewardRate;
        lastUpdateTime = block.timestamp;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);

        // Initialize tier configurations
        // Bronze Tier
        tierConfigs[StakingTier.BRONZE] = TierConfig({
            minStakeAmount: 1_000 * 1e18,    // 1,000 tokens
            rewardMultiplier: 100,           // 1x rewards
            votingPower: 1,                  // Base voting power
            lockPeriod: 30 days             // 30 days lock
        });

        // Silver Tier
        tierConfigs[StakingTier.SILVER] = TierConfig({
            minStakeAmount: 10_000 * 1e18,   // 10,000 tokens
            rewardMultiplier: 150,           // 1.5x rewards
            votingPower: 3,                  // 3x voting power
            lockPeriod: 60 days             // 60 days lock
        });

        // Gold Tier
        tierConfigs[StakingTier.GOLD] = TierConfig({
            minStakeAmount: 50_000 * 1e18,   // 50,000 tokens
            rewardMultiplier: 200,           // 2x rewards
            votingPower: 5,                  // 5x voting power
            lockPeriod: 90 days             // 90 days lock
        });

        // Diamond Tier
        tierConfigs[StakingTier.DIAMOND] = TierConfig({
            minStakeAmount: 200_000 * 1e18,  // 200,000 tokens
            rewardMultiplier: 300,           // 3x rewards
            votingPower: 10,                 // 10x voting power
            lockPeriod: 180 days            // 180 days lock
        });
    }

    /**
     * @dev Calculates the appropriate tier for a given stake amount
     */
    function calculateTier(uint256 amount) public view returns (StakingTier) {
        if (amount >= tierConfigs[StakingTier.DIAMOND].minStakeAmount) {
            return StakingTier.DIAMOND;
        } else if (amount >= tierConfigs[StakingTier.GOLD].minStakeAmount) {
            return StakingTier.GOLD;
        } else if (amount >= tierConfigs[StakingTier.SILVER].minStakeAmount) {
            return StakingTier.SILVER;
        } else if (amount >= tierConfigs[StakingTier.BRONZE].minStakeAmount) {
            return StakingTier.BRONZE;
        }
        return StakingTier.NONE;
    }

    /**
     * @dev Updates the reward variables
     */
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    /**
     * @dev Returns the current reward per token with tier multiplier
     */
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * baseRewardRate * REWARD_PRECISION) / totalStaked);
    }

    /**
     * @dev Returns the amount of rewards earned by an account considering their tier
     */
    function earned(address account) public view returns (uint256) {
        uint256 baseEarned = ((stakedBalance[account] *
            (rewardPerToken() - userRewardPerTokenPaid[account])) / REWARD_PRECISION) +
            rewards[account];
            
        // Apply tier multiplier
        return (baseEarned * tierConfigs[userTier[account]].rewardMultiplier) / 100;
    }

    /**
     * @dev Stakes tokens and assigns appropriate tier
     * @param amount Amount of tokens to stake
     */
    function stake(uint256 amount) external nonReentrant whenNotPaused updateReward(msg.sender) {
        StakingTier newTier = calculateTier(amount);
        require(newTier != StakingTier.NONE, "Amount below minimum stake");
        require(amount <= MAX_STAKE_AMOUNT, "Amount above maximum stake");
        
        totalStaked += amount;
        stakedBalance[msg.sender] += amount;
        lastStakeTime[msg.sender] = block.timestamp;

        // Update user's tier
        StakingTier oldTier = userTier[msg.sender];
        userTier[msg.sender] = newTier;

        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        emit Staked(msg.sender, amount, newTier);
        if (oldTier != newTier) {
            emit TierUpgraded(msg.sender, oldTier, newTier);
        }
    }

    /**
     * @dev Unstakes tokens if lock period has passed
     * @param amount Amount of tokens to unstake
     */
    function unstake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot unstake 0");
        require(stakedBalance[msg.sender] >= amount, "Insufficient staked amount");
        
        StakingTier currentTier = userTier[msg.sender];
        require(
            block.timestamp >= lastStakeTime[msg.sender] + tierConfigs[currentTier].lockPeriod,
            "Tokens are still locked"
        );

        totalStaked -= amount;
        stakedBalance[msg.sender] -= amount;

        // Recalculate tier after unstaking
        StakingTier newTier = calculateTier(stakedBalance[msg.sender]);
        if (newTier != currentTier) {
            userTier[msg.sender] = newTier;
            emit TierUpgraded(msg.sender, currentTier, newTier);
        }

        require(stakingToken.transfer(msg.sender, amount), "Transfer failed");
        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev Claims rewards
     */
    function claimRewards() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards to claim");

        rewards[msg.sender] = 0;
        require(stakingToken.transfer(msg.sender, reward), "Transfer failed");
        emit RewardClaimed(msg.sender, reward);
    }

    /**
     * @dev Returns the APR for a specific tier
     * @param tier The tier to calculate APR for
     */
    function getTierAPR(StakingTier tier) external view returns (uint256) {
        if (totalStaked == 0) return 0;
        
        // Calculate base yearly rewards
        uint256 yearlyRewards = baseRewardRate * 365 days;
        
        // Apply tier multiplier
        yearlyRewards = (yearlyRewards * tierConfigs[tier].rewardMultiplier) / 100;
        
        // Calculate APR: (yearlyRewards / totalStaked) * 100
        return (yearlyRewards * 100 * REWARD_PRECISION) / totalStaked;
    }

    /**
     * @dev Updates tier configuration (admin only)
     */
    function updateTierConfig(
        StakingTier tier,
        uint256 minStake,
        uint256 multiplier,
        uint256 votingPower,
        uint256 lockPeriod
    ) external onlyRole(ADMIN_ROLE) {
        require(tier != StakingTier.NONE, "Cannot update NONE tier");
        require(minStake > 0, "Invalid min stake");
        require(multiplier > 0, "Invalid multiplier");
        require(votingPower > 0, "Invalid voting power");
        require(lockPeriod > 0, "Invalid lock period");

        tierConfigs[tier] = TierConfig({
            minStakeAmount: minStake,
            rewardMultiplier: multiplier,
            votingPower: votingPower,
            lockPeriod: lockPeriod
        });

        emit TierConfigUpdated(tier, minStake, multiplier, votingPower, lockPeriod);
    }

    /**
     * @dev Returns complete staking info for an account
     */
    function getStakingInfo(address account) external view returns (
        uint256 _stakedBalance,
        StakingTier _tier,
        uint256 _rewards,
        uint256 _votingPower,
        uint256 _lockEndTime,
        uint256 _multiplier
    ) {
        StakingTier tier = userTier[account];
        return (
            stakedBalance[account],
            tier,
            earned(account),
            tierConfigs[tier].votingPower,
            lastStakeTime[account] + tierConfigs[tier].lockPeriod,
            tierConfigs[tier].rewardMultiplier
        );
    }

    /**
     * @dev Returns the voting power for an account
     */
    function getVotingPower(address account) external view returns (uint256) {
        return tierConfigs[userTier[account]].votingPower;
    }

    /**
     * @dev Pauses the contract
     */
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Unpauses the contract
     */
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }
} 