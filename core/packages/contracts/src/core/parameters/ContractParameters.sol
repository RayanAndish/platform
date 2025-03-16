// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ContractParameters
 * @dev قرارداد مدیریت پارامترهای پویا برای سایر قراردادها
 */
contract ContractParameters is Ownable2Step, ReentrancyGuard {
    // ساختار پارامترهای استیکینگ
    struct StakingParams {
        uint256 minStakeAmount;
        uint256 maxStakeAmount;
        uint256 lockPeriod;
        uint256 rewardRate;
        uint256[] tierThresholds;
        uint256[] tierMultipliers;
    }

    // ساختار پارامترهای رأی‌گیری
    struct VotingParams {
        uint256 minVotingPeriod;
        uint256 maxVotingPeriod;
        uint256 quorumPercentage;
        uint256 minProposalThreshold;
        uint256 votingDelay;
    }

    // ساختار پارامترهای مالی
    struct FinanceParams {
        uint256 minInvestment;
        uint256 maxInvestment;
        uint256 investmentFee;
        uint256 withdrawalFee;
        uint256 performanceFee;
    }

    // ساختار پارامترهای DAO
    struct DAOParams {
        uint256 executionDelay;
        uint256 guardianDelay;
        uint256 minMemberCount;
        uint256 maxMemberCount;
        uint256 proposalThreshold;
    }

    // ذخیره‌سازی پارامترها
    StakingParams public stakingParams;
    VotingParams public votingParams;
    FinanceParams public financeParams;
    DAOParams public daoParams;

    // رویدادها
    event StakingParamsUpdated(StakingParams params);
    event VotingParamsUpdated(VotingParams params);
    event FinanceParamsUpdated(FinanceParams params);
    event DAOParamsUpdated(DAOParams params);

    constructor() {
        // مقداردهی اولیه پارامترها
        initializeDefaultParams();
    }

    /**
     * @dev مقداردهی اولیه پارامترها با مقادیر پیش‌فرض
     */
    function initializeDefaultParams() private {
        // مقادیر پیش‌فرض استیکینگ
        stakingParams = StakingParams({
            minStakeAmount: 100 ether,
            maxStakeAmount: 10000 ether,
            lockPeriod: 30 days,
            rewardRate: 10, // 10% سالانه
            tierThresholds: new uint256[](4),
            tierMultipliers: new uint256[](4)
        });
        stakingParams.tierThresholds[0] = 100 ether;   // Bronze
        stakingParams.tierThresholds[1] = 500 ether;   // Silver
        stakingParams.tierThresholds[2] = 1000 ether;  // Gold
        stakingParams.tierThresholds[3] = 5000 ether;  // Diamond
        stakingParams.tierMultipliers[0] = 10;  // 1x
        stakingParams.tierMultipliers[1] = 15;  // 1.5x
        stakingParams.tierMultipliers[2] = 20;  // 2x
        stakingParams.tierMultipliers[3] = 30;  // 3x

        // مقادیر پیش‌فرض رأی‌گیری
        votingParams = VotingParams({
            minVotingPeriod: 1 days,
            maxVotingPeriod: 7 days,
            quorumPercentage: 51,
            minProposalThreshold: 100 ether,
            votingDelay: 1 days
        });

        // مقادیر پیش‌فرض مالی
        financeParams = FinanceParams({
            minInvestment: 1 ether,
            maxInvestment: 1000 ether,
            investmentFee: 1, // 0.1%
            withdrawalFee: 5,  // 0.5%
            performanceFee: 20 // 2%
        });

        // مقادیر پیش‌فرض DAO
        daoParams = DAOParams({
            executionDelay: 2 days,
            guardianDelay: 1 days,
            minMemberCount: 3,
            maxMemberCount: 100,
            proposalThreshold: 100 ether
        });
    }

    // توابع به‌روزرسانی پارامترها (فقط مالک)
    function updateStakingParams(StakingParams calldata _params) external onlyOwner {
        require(_params.minStakeAmount < _params.maxStakeAmount, "Invalid stake amounts");
        require(_params.tierThresholds.length == _params.tierMultipliers.length, "Invalid tier arrays");
        stakingParams = _params;
        emit StakingParamsUpdated(_params);
    }

    function updateVotingParams(VotingParams calldata _params) external onlyOwner {
        require(_params.minVotingPeriod < _params.maxVotingPeriod, "Invalid voting periods");
        require(_params.quorumPercentage <= 100, "Invalid quorum percentage");
        votingParams = _params;
        emit VotingParamsUpdated(_params);
    }

    function updateFinanceParams(FinanceParams calldata _params) external onlyOwner {
        require(_params.minInvestment < _params.maxInvestment, "Invalid investment amounts");
        require(_params.investmentFee <= 1000, "Fee too high"); // max 100%
        require(_params.withdrawalFee <= 1000, "Fee too high");
        require(_params.performanceFee <= 1000, "Fee too high");
        financeParams = _params;
        emit FinanceParamsUpdated(_params);
    }

    function updateDAOParams(DAOParams calldata _params) external onlyOwner {
        require(_params.minMemberCount < _params.maxMemberCount, "Invalid member counts");
        daoParams = _params;
        emit DAOParamsUpdated(_params);
    }

    // توابع دریافت پارامترها
    function getStakingParams() external view returns (StakingParams memory) {
        return stakingParams;
    }

    function getVotingParams() external view returns (VotingParams memory) {
        return votingParams;
    }

    function getFinanceParams() external view returns (FinanceParams memory) {
        return financeParams;
    }

    function getDAOParams() external view returns (DAOParams memory) {
        return daoParams;
    }
} 