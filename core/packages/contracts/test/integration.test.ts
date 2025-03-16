import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  Token,
  CustomHash,
  AccControl,
  Finance,
  Staking,
  Voting,
  DAO
} from "../typechain";

describe("DAO-VC Integration Tests", function () {
  let token: Token;
  let customHash: CustomHash;
  let accControl: AccControl;
  let finance: Finance;
  let staking: Staking;
  let voting: Voting;
  let dao: DAO;
  let owner: SignerWithAddress;
  let investor: SignerWithAddress;
  let validator: SignerWithAddress;
  let developer: SignerWithAddress;

  const INVESTMENT_AMOUNT = ethers.parseEther("1000");
  const STAKING_AMOUNT = ethers.parseEther("500");
  const LOCK_PERIOD = 30 * 24 * 60 * 60; // 30 days

  beforeEach(async function () {
    // Get signers
    [owner, investor, validator, developer] = await ethers.getSigners();

    // Deploy Token
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(owner.address);
    await token.waitForDeployment();

    // Deploy CustomHash
    const CustomHash = await ethers.getContractFactory("CustomHash");
    customHash = await CustomHash.deploy();
    await customHash.waitForDeployment();

    // Deploy AccControl
    const AccControl = await ethers.getContractFactory("AccControl");
    accControl = await AccControl.deploy(
      await customHash.getAddress(),
      owner.address
    );
    await accControl.waitForDeployment();

    // Deploy Finance
    const Finance = await ethers.getContractFactory("Finance");
    finance = await Finance.deploy(
      await token.getAddress(),
      await accControl.getAddress(),
      await customHash.getAddress(),
      owner.address
    );
    await finance.waitForDeployment();

    // Deploy Staking
    const Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(
      await token.getAddress(),
      await accControl.getAddress(),
      await customHash.getAddress(),
      owner.address
    );
    await staking.waitForDeployment();

    // Deploy Voting
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(
      await accControl.getAddress(),
      await customHash.getAddress(),
      owner.address
    );
    await voting.waitForDeployment();

    // Deploy DAO
    const DAO = await ethers.getContractFactory("DAO");
    dao = await DAO.deploy(
      await accControl.getAddress(),
      await customHash.getAddress(),
      owner.address
    );
    await dao.waitForDeployment();

    // Setup roles
    await accControl.grantRole(await accControl.INVESTOR_ROLE(), investor.address);
    await accControl.grantRole(await accControl.VALIDATOR_ROLE(), validator.address);
    await accControl.grantRole(await accControl.DEVELOPER_ROLE(), developer.address);

    // Setup permissions
    await token.grantRole(await token.MINTER_ROLE(), finance.getAddress());
    await token.grantRole(await token.MINTER_ROLE(), staking.getAddress());

    // Mint initial tokens
    await token.mint(investor.address, INVESTMENT_AMOUNT.mul(2));
    await token.mint(validator.address, STAKING_AMOUNT.mul(2));
  });

  describe("Investment Flow", function () {
    it("Should allow investment and withdrawal", async function () {
      // Approve tokens
      await token.connect(investor).approve(finance.getAddress(), INVESTMENT_AMOUNT);

      // Make investment
      await finance.connect(investor).invest(INVESTMENT_AMOUNT);

      // Check investment
      const investment = await finance.investments(investor.address);
      expect(investment.amount).to.equal(INVESTMENT_AMOUNT);
      expect(investment.active).to.be.true;

      // Try to withdraw before lock period
      await expect(
        finance.connect(investor).withdraw()
      ).to.be.revertedWith("Still in lock period");

      // Advance time
      await ethers.provider.send("evm_increaseTime", [LOCK_PERIOD + 1]);
      await ethers.provider.send("evm_mine", []);

      // Withdraw investment
      await finance.connect(investor).withdraw();

      // Check investment is closed
      const investmentAfter = await finance.investments(investor.address);
      expect(investmentAfter.active).to.be.false;
    });
  });

  describe("Staking Flow", function () {
    it("Should allow staking and unstaking", async function () {
      // Approve tokens
      await token.connect(validator).approve(staking.getAddress(), STAKING_AMOUNT);

      // Stake tokens
      await staking.connect(validator).stake(STAKING_AMOUNT);

      // Check stake
      const stake = await staking.stakes(validator.address);
      expect(stake.amount).to.equal(STAKING_AMOUNT);
      expect(stake.active).to.be.true;

      // Try to unstake before lock period
      await expect(
        staking.connect(validator).unstake()
      ).to.be.revertedWith("Still in lock period");

      // Advance time
      await ethers.provider.send("evm_increaseTime", [LOCK_PERIOD + 1]);
      await ethers.provider.send("evm_mine", []);

      // Unstake tokens
      await staking.connect(validator).unstake();

      // Check stake is closed
      const stakeAfter = await staking.stakes(validator.address);
      expect(stakeAfter.active).to.be.false;
    });
  });

  describe("Voting Flow", function () {
    it("Should allow proposal creation and voting", async function () {
      // Create proposal
      await voting.connect(validator).createProposal(
        "Test Proposal",
        "Test Description",
        0, // Standard proposal
        7 * 24 * 60 * 60, // 7 days
        false // Not quadratic
      );

      // Check proposal
      const proposal = await voting.getProposalDetails(1);
      expect(proposal.title).to.equal("Test Proposal");
      expect(proposal.status).to.equal(1); // Active

      // Cast votes
      await voting.connect(validator).castVote(1, 1, "Support"); // Vote FOR
      await voting.connect(developer).castVote(1, 2, "Against"); // Vote AGAINST

      // Check votes
      const voteDetails1 = await voting.getVoteDetails(1, validator.address);
      expect(voteDetails1.voteType).to.equal(1); // FOR
      
      const voteDetails2 = await voting.getVoteDetails(1, developer.address);
      expect(voteDetails2.voteType).to.equal(2); // AGAINST
    });
  });

  describe("DAO Flow", function () {
    it("Should allow DAO operations", async function () {
      // Create project
      await dao.connect(developer).createProposal(
        "Test Project",
        300 // 5 minutes
      );

      // Check project
      const proposal = await dao.getProposal(1);
      expect(proposal.description).to.equal("Test Project");
      expect(proposal.executed).to.be.false;

      // Vote on project
      await dao.connect(validator).vote(1, true);

      // Advance time
      await ethers.provider.send("evm_increaseTime", [301]);
      await ethers.provider.send("evm_mine", []);

      // Execute proposal
      await dao.connect(owner).executeProposal(1);

      // Check execution
      const proposalAfter = await dao.getProposal(1);
      expect(proposalAfter.executed).to.be.true;
    });
  });
}); 