require("dotenv").config();
const fs = require("fs-extra");
const AccControl = artifacts.require("AccControl");
const Consensus = artifacts.require("Consensus");
const DAO = artifacts.require("DAO");
const Investment = artifacts.require("Investment");
const Migrations = artifacts.require("Migrations");
const Payments = artifacts.require("Payments");
const ProjectMon = artifacts.require("ProjectMon");
const Token = artifacts.require("Token");
const Voting = artifacts.require("Voting");
const CustomHash = artifacts.require("CustomHash");

module.exports = async function (deployer, network, accounts) {
  try {
    console.log("Deploying contracts...");
    
    const initialSupply = process.env.INITIAL_SUPPLY || "1000000";
    const daoAdmin = process.env.DAO_ADMIN || accounts[0];
    const votingFeeRate = process.env.VOTING_FEE_RATE || "5";
    const feeCollector = process.env.FEE_COLLECTOR || accounts[9];
    const priceFeedAddress = process.env.PRICE_FEED_ADDRESS || accounts[8];
    const initialOwner = process.env.INITIAL_OWNER || accounts[0];
    const governanceToken = process.env.GOVERNANCE_TOKEN || accounts[7];
    const minInvestmentAmount = process.env.MIN_INVESTMENT_AMOUNT || "100";

    [daoAdmin, feeCollector, priceFeedAddress, initialOwner, governanceToken].forEach((address) => {
      if (!web3.utils.isAddress(address)) {
        throw new Error(`Invalid address provided: ${address}`);
      }
    });

    console.log("Deploying CustomHash...");
    await deployer.deploy(CustomHash);
    const customHashInstance = await CustomHash.deployed();
    
    console.log("Deploying AccControl...");
    await deployer.deploy(AccControl, initialOwner, customHashInstance.address);
    const accControlInstance = await AccControl.deployed();

    console.log("Deploying Token...");
    await deployer.deploy(Token, initialSupply, initialOwner, accControlInstance.address, customHashInstance.address);
    const tokenInstance = await Token.deployed();

    console.log("Deploying DAO...");
    await deployer.deploy(DAO, initialOwner, tokenInstance.address, accControlInstance.address);
    const daoInstance = await DAO.deployed();

    console.log("Deploying Voting...");
    await deployer.deploy(Voting, initialOwner, accControlInstance.address, customHashInstance.address);
    const votingInstance = await Voting.deployed();

    console.log("Deploying Consensus...");
    await deployer.deploy(Consensus, accControlInstance.address, customHashInstance.address, initialOwner);
    const consensusInstance = await Consensus.deployed();

    console.log("Deploying Investment...");
    await deployer.deploy(Investment, initialOwner, tokenInstance.address, accControlInstance.address, customHashInstance.address);
    const investmentInstance = await Investment.deployed();

    console.log("Deploying Payments...");
    await deployer.deploy(Payments, initialOwner, tokenInstance.address, accControlInstance.address, customHashInstance.address);
    const paymentInstance = await Payments.deployed();

    console.log("Deploying ProjectMon...");
    await deployer.deploy(ProjectMon, initialOwner, accControlInstance.address, customHashInstance.address);
    const monitoringInstance = await ProjectMon.deployed();

    console.log("Saving deployment information...");
    const deploymentInfo = {
      CustomHash: customHashInstance.address,
      AccControl: accControlInstance.address,
      Token: tokenInstance.address,
      DAO: daoInstance.address,
      Voting: votingInstance.address,
      Consensus: consensusInstance.address,
      Investment: investmentInstance.address,
      Payments: paymentInstance.address,
      ProjectMon: monitoringInstance.address,
    };
    await fs.outputJson("./deployment_info.json", deploymentInfo, { spaces: 2 });
    console.log("Deployment complete. Info saved to deployment_info.json");
  } catch (error) {
    console.error("Error during deployment:", error.message);
    process.exit(1);
  }
};