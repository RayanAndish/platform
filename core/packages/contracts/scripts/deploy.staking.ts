import { ethers, network } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Deploying Staking contract...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", ethers.utils.formatEther(await deployer.getBalance()));

  // Get the token address from environment variables
  const stakingTokenAddress = process.env.STAKING_TOKEN_ADDRESS;
  if (!stakingTokenAddress) {
    throw new Error("STAKING_TOKEN_ADDRESS not set in environment");
  }

  // Initial base reward rate: 0.1 token per day (in wei per second)
  // 0.1 * 1e18 / (24 * 60 * 60) ≈ 1157 wei per second
  const baseRewardRate = ethers.utils.parseEther("0.1").div(24 * 60 * 60);

  try {
    // Deploy the Staking contract
    console.log("\nDeploying Staking contract...");
    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(stakingTokenAddress, baseRewardRate);
    await staking.deployed();

    console.log("\nStaking contract deployed successfully!");
    console.log("Contract address:", staking.address);
    console.log("Base reward rate:", ethers.utils.formatEther(baseRewardRate), "tokens per second");

    // Verify the deployment
    console.log("\nVerifying deployment configuration:");
    console.log("- Staking token:", await staking.stakingToken());
    console.log("- Base reward rate:", ethers.utils.formatEther(await staking.baseRewardRate()), "tokens per second");
    
    // Verify tier configurations
    const tiers = ["BRONZE", "SILVER", "GOLD", "DIAMOND"];
    console.log("\nTier Configurations:");
    for (let i = 1; i <= 4; i++) {
      const config = await staking.tierConfigs(i);
      console.log(`\n${tiers[i-1]} Tier:`);
      console.log("- Minimum stake:", ethers.utils.formatEther(config.minStakeAmount), "tokens");
      console.log("- Reward multiplier:", config.rewardMultiplier.toString(), "%");
      console.log("- Voting power:", config.votingPower.toString(), "votes");
      console.log("- Lock period:", config.lockPeriod.toString(), "seconds");
    }

    // Verify admin role
    const adminRole = await staking.DEFAULT_ADMIN_ROLE();
    console.log("\nAdmin configuration:");
    console.log("- Deployer has admin role:", await staking.hasRole(adminRole, deployer.address));

    // Calculate and display APR for each tier
    console.log("\nInitial APR per tier:");
    for (let i = 1; i <= 4; i++) {
      const apr = await staking.getTierAPR(i);
      console.log(`- ${tiers[i-1]} Tier APR: ${apr.toString()}%`);
    }

    // Save deployment information
    const deploymentInfo = {
      network: network.name,
      stakingContract: staking.address,
      stakingToken: stakingTokenAddress,
      baseRewardRate: baseRewardRate.toString(),
      deploymentTime: new Date().toISOString(),
      deployer: deployer.address
    };

    // Save to deployment history
    const deploymentPath = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentPath)) {
      fs.mkdirSync(deploymentPath);
    }

    fs.writeFileSync(
      path.join(deploymentPath, `staking-${network.name}.json`),
      JSON.stringify(deploymentInfo, null, 2)
    );

    // Update .env file
    console.log("\nUpdating environment variables...");
    const envPath = path.join(__dirname, "../.env");
    let envContent = fs.existsSync(envPath) 
      ? fs.readFileSync(envPath, "utf8")
      : "";

    const envUpdate = `STAKING_CONTRACT_ADDRESS=${staking.address}\n`;
    if (envContent.includes("STAKING_CONTRACT_ADDRESS=")) {
      envContent = envContent.replace(
        /STAKING_CONTRACT_ADDRESS=.*/,
        `STAKING_CONTRACT_ADDRESS=${staking.address}`
      );
    } else {
      envContent += envUpdate;
    }

    fs.writeFileSync(envPath, envContent);
    console.log("Environment variables updated successfully");

    console.log("\nDeployment completed successfully!");
    
  } catch (error) {
    console.error("\nDeployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 