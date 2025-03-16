import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("Staking Contract", function () {
  let staking: Contract;
  let token: Contract;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let baseRewardRate: any;

  const BRONZE_MIN_STAKE = ethers.utils.parseEther("1000");
  const SILVER_MIN_STAKE = ethers.utils.parseEther("10000");
  const GOLD_MIN_STAKE = ethers.utils.parseEther("50000");
  const DIAMOND_MIN_STAKE = ethers.utils.parseEther("200000");

  beforeEach(async function () {
    // Deploy test token
    const Token = await ethers.getContractFactory("TestToken");
    token = await Token.deploy("Test Token", "TEST", ethers.utils.parseEther("1000000"));
    await token.deployed();

    // Deploy staking contract
    baseRewardRate = ethers.utils.parseEther("0.1").div(24 * 60 * 60); // 0.1 token per day
    const Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(token.address, baseRewardRate);
    await staking.deployed();

    [owner, user1, user2] = await ethers.getSigners();

    // Transfer tokens to users
    await token.transfer(user1.address, ethers.utils.parseEther("300000"));
    await token.transfer(user2.address, ethers.utils.parseEther("300000"));

    // Approve staking contract
    await token.connect(user1).approve(staking.address, ethers.constants.MaxUint256);
    await token.connect(user2).approve(staking.address, ethers.constants.MaxUint256);
  });

  describe("Deployment", function () {
    it("Should set the correct token address", async function () {
      expect(await staking.stakingToken()).to.equal(token.address);
    });

    it("Should set the correct base reward rate", async function () {
      expect(await staking.baseRewardRate()).to.equal(baseRewardRate);
    });

    it("Should initialize tiers correctly", async function () {
      const bronzeConfig = await staking.tierConfigs(1); // BRONZE
      const silverConfig = await staking.tierConfigs(2); // SILVER
      const goldConfig = await staking.tierConfigs(3); // GOLD
      const diamondConfig = await staking.tierConfigs(4); // DIAMOND

      expect(bronzeConfig.minStakeAmount).to.equal(BRONZE_MIN_STAKE);
      expect(silverConfig.minStakeAmount).to.equal(SILVER_MIN_STAKE);
      expect(goldConfig.minStakeAmount).to.equal(GOLD_MIN_STAKE);
      expect(diamondConfig.minStakeAmount).to.equal(DIAMOND_MIN_STAKE);
    });
  });

  describe("Staking", function () {
    it("Should assign correct tier based on stake amount", async function () {
      // Bronze tier
      await staking.connect(user1).stake(BRONZE_MIN_STAKE);
      expect(await staking.userTier(user1.address)).to.equal(1);

      // Silver tier
      await staking.connect(user2).stake(SILVER_MIN_STAKE);
      expect(await staking.userTier(user2.address)).to.equal(2);
    });

    it("Should reject stake below minimum amount", async function () {
      await expect(
        staking.connect(user1).stake(ethers.utils.parseEther("100"))
      ).to.be.revertedWith("Amount below minimum stake");
    });

    it("Should reject stake above maximum amount", async function () {
      const maxStake = await staking.MAX_STAKE_AMOUNT();
      await expect(
        staking.connect(user1).stake(maxStake.add(1))
      ).to.be.revertedWith("Amount above maximum stake");
    });

    it("Should update total staked amount", async function () {
      await staking.connect(user1).stake(BRONZE_MIN_STAKE);
      expect(await staking.totalStaked()).to.equal(BRONZE_MIN_STAKE);
    });

    it("Should emit Staked and TierUpgraded events", async function () {
      await expect(staking.connect(user1).stake(BRONZE_MIN_STAKE))
        .to.emit(staking, "Staked")
        .withArgs(user1.address, BRONZE_MIN_STAKE, 1)
        .to.emit(staking, "TierUpgraded")
        .withArgs(user1.address, 0, 1);
    });
  });

  describe("Rewards", function () {
    beforeEach(async function () {
      await staking.connect(user1).stake(BRONZE_MIN_STAKE);
      await staking.connect(user2).stake(SILVER_MIN_STAKE);
    });

    it("Should calculate rewards correctly for different tiers", async function () {
      await time.increase(30 * 24 * 60 * 60); // 30 days

      const user1Rewards = await staking.earned(user1.address);
      const user2Rewards = await staking.earned(user2.address);

      // User2 (Silver) should have 1.5x the base rewards of User1 (Bronze)
      expect(user2Rewards).to.be.gt(user1Rewards);
      expect(user2Rewards).to.be.closeTo(
        user1Rewards.mul(150).div(100),
        ethers.utils.parseEther("0.01")
      );
    });

    it("Should allow claiming rewards", async function () {
      await time.increase(30 * 24 * 60 * 60); // 30 days

      const initialBalance = await token.balanceOf(user1.address);
      const rewards = await staking.earned(user1.address);

      await staking.connect(user1).claimRewards();

      const finalBalance = await token.balanceOf(user1.address);
      expect(finalBalance.sub(initialBalance)).to.equal(rewards);
    });
  });

  describe("Unstaking", function () {
    beforeEach(async function () {
      await staking.connect(user1).stake(GOLD_MIN_STAKE);
    });

    it("Should not allow unstaking before lock period", async function () {
      await expect(
        staking.connect(user1).unstake(GOLD_MIN_STAKE)
      ).to.be.revertedWith("Tokens are still locked");
    });

    it("Should allow unstaking after lock period", async function () {
      const goldConfig = await staking.tierConfigs(3); // GOLD tier
      await time.increase(goldConfig.lockPeriod);

      await expect(staking.connect(user1).unstake(GOLD_MIN_STAKE))
        .to.emit(staking, "Unstaked")
        .withArgs(user1.address, GOLD_MIN_STAKE);
    });

    it("Should update tier after partial unstake", async function () {
      const goldConfig = await staking.tierConfigs(3); // GOLD tier
      await time.increase(goldConfig.lockPeriod);

      // Unstake to Silver tier level
      const unstakeAmount = GOLD_MIN_STAKE.sub(SILVER_MIN_STAKE);
      await staking.connect(user1).unstake(unstakeAmount);

      expect(await staking.userTier(user1.address)).to.equal(2); // SILVER
    });
  });

  describe("Voting Power", function () {
    it("Should assign correct voting power for each tier", async function () {
      // Bronze tier
      await staking.connect(user1).stake(BRONZE_MIN_STAKE);
      expect(await staking.getVotingPower(user1.address)).to.equal(1);

      // Silver tier
      await staking.connect(user2).stake(SILVER_MIN_STAKE);
      expect(await staking.getVotingPower(user2.address)).to.equal(3);
    });
  });

  describe("Admin Functions", function () {
    it("Should allow admin to update tier configuration", async function () {
      const newMinStake = ethers.utils.parseEther("2000");
      const newMultiplier = 120;
      const newVotingPower = 2;
      const newLockPeriod = 45 * 24 * 60 * 60; // 45 days

      await expect(
        staking.updateTierConfig(1, newMinStake, newMultiplier, newVotingPower, newLockPeriod)
      )
        .to.emit(staking, "TierConfigUpdated")
        .withArgs(1, newMinStake, newMultiplier, newVotingPower, newLockPeriod);

      const bronzeConfig = await staking.tierConfigs(1);
      expect(bronzeConfig.minStakeAmount).to.equal(newMinStake);
      expect(bronzeConfig.rewardMultiplier).to.equal(newMultiplier);
      expect(bronzeConfig.votingPower).to.equal(newVotingPower);
      expect(bronzeConfig.lockPeriod).to.equal(newLockPeriod);
    });

    it("Should not allow non-admin to update tier configuration", async function () {
      await expect(
        staking.connect(user1).updateTierConfig(
          1,
          ethers.utils.parseEther("2000"),
          120,
          2,
          45 * 24 * 60 * 60
        )
      ).to.be.reverted;
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await staking.connect(user1).stake(GOLD_MIN_STAKE);
    });

    it("Should return correct staking info", async function () {
      const info = await staking.getStakingInfo(user1.address);
      expect(info._stakedBalance).to.equal(GOLD_MIN_STAKE);
      expect(info._tier).to.equal(3); // GOLD
      expect(info._votingPower).to.equal(5);
      expect(info._multiplier).to.equal(200);
    });

    it("Should calculate correct APR for each tier", async function () {
      const bronzeAPR = await staking.getTierAPR(1);
      const silverAPR = await staking.getTierAPR(2);
      const goldAPR = await staking.getTierAPR(3);
      const diamondAPR = await staking.getTierAPR(4);

      expect(silverAPR).to.be.gt(bronzeAPR);
      expect(goldAPR).to.be.gt(silverAPR);
      expect(diamondAPR).to.be.gt(goldAPR);
    });
  });
}); 