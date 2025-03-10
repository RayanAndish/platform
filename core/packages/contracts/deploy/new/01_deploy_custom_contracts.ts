import { ethers } from "hardhat";

async function main() {
  console.log("Deploying custom contracts...");

  // Deploy Investment contract
  const Investment = await ethers.getContractFactory("Investment");
  const investment = await Investment.deploy();
  await investment.deployed();
  console.log("Investment deployed to:", investment.address);

  // Deploy Voting contract
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.deployed();
  console.log("Voting deployed to:", voting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });