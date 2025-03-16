import { ethers } from "hardhat";
import { writeFileSync } from "fs";
import { join } from "path";

async function main() {
  console.log("Starting deployment to Ganache...");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  try {
    // Deploy Token contract
    console.log("\nDeploying Token contract...");
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(deployer.address);
    await token.waitForDeployment();
    console.log("Token deployed to:", await token.getAddress());

    // Deploy CustomHash contract
    console.log("\nDeploying CustomHash contract...");
    const CustomHash = await ethers.getContractFactory("CustomHash");
    const customHash = await CustomHash.deploy();
    await customHash.waitForDeployment();
    console.log("CustomHash deployed to:", await customHash.getAddress());

    // Deploy AccControl contract
    console.log("\nDeploying AccControl contract...");
    const AccControl = await ethers.getContractFactory("AccControl");
    const accControl = await AccControl.deploy(
      await customHash.getAddress(),
      deployer.address
    );
    await accControl.waitForDeployment();
    console.log("AccControl deployed to:", await accControl.getAddress());

    // Deploy Finance contract
    console.log("\nDeploying Finance contract...");
    const Finance = await ethers.getContractFactory("Finance");
    const finance = await Finance.deploy(
      await token.getAddress(),
      await accControl.getAddress(),
      await customHash.getAddress(),
      deployer.address
    );
    await finance.waitForDeployment();
    console.log("Finance deployed to:", await finance.getAddress());

    // Deploy Staking contract
    console.log("\nDeploying Staking contract...");
    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(
      await token.getAddress(),
      await accControl.getAddress(),
      await customHash.getAddress(),
      deployer.address
    );
    await staking.waitForDeployment();
    console.log("Staking deployed to:", await staking.getAddress());

    // Deploy Voting contract
    console.log("\nDeploying Voting contract...");
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(
      await accControl.getAddress(),
      await customHash.getAddress(),
      deployer.address
    );
    await voting.waitForDeployment();
    console.log("Voting deployed to:", await voting.getAddress());

    // Deploy DAO contract
    console.log("\nDeploying DAO contract...");
    const DAO = await ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(
      await accControl.getAddress(),
      await customHash.getAddress(),
      deployer.address
    );
    await dao.waitForDeployment();
    console.log("DAO deployed to:", await dao.getAddress());

    // Save deployment addresses
    const deploymentInfo = {
      network: "ganache",
      token: await token.getAddress(),
      customHash: await customHash.getAddress(),
      accControl: await accControl.getAddress(),
      finance: await finance.getAddress(),
      staking: await staking.getAddress(),
      voting: await voting.getAddress(),
      dao: await dao.getAddress(),
      deployer: deployer.address,
      timestamp: new Date().toISOString()
    };

    // Save to file
    writeFileSync(
      join(__dirname, "../deployed-contracts.json"),
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("\nDeployment completed successfully!");
    console.log("Deployment information saved to deployed-contracts.json");

    // Initialize contracts
    console.log("\nInitializing contracts...");

    // Grant roles
    console.log("Granting roles...");
    await accControl.grantRole(await accControl.DAO_ROLE(), deployer.address);
    await accControl.grantRole(await accControl.VALIDATOR_ROLE(), deployer.address);

    // Set contract permissions
    console.log("Setting permissions...");
    await token.grantRole(await token.MINTER_ROLE(), finance.getAddress());
    await token.grantRole(await token.MINTER_ROLE(), staking.getAddress());

    console.log("Initialization completed!");

  } catch (error) {
    console.error("Error during deployment:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 