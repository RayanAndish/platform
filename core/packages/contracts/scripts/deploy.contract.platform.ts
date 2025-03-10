import { ethers, upgrades } from "hardhat";
import { loadParameters, saveParameters } from "./utils/parameters";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy CustomHash
  const CustomHash = await ethers.getContractFactory("CustomHash");
  const customHash = await CustomHash.deploy();
  await customHash.deployed();
  console.log("CustomHash deployed to:", customHash.address);

  // Deploy AccControl
  const AccControl = await ethers.getContractFactory("AccControl");
  const accControl = await AccControl.deploy(deployer.address, customHash.address);
  await accControl.deployed();
  console.log("AccControl deployed to:", accControl.address);

  // Deploy DAO
  const DAO = await ethers.getContractFactory("src/core/dao/DAO.sol:DAO");
  const dao = await upgrades.deployProxy(DAO, [
    "0x", // Empty metadata
    deployer.address, // Initial owner
    ethers.constants.AddressZero, // No trusted forwarder
    "" // Empty URI
  ]);
  await dao.deployed();
  console.log("DAO deployed to:", dao.address);

  // Save parameters
  const parameters = await loadParameters();
  parameters.customHash = customHash.address;
  parameters.accControl = accControl.address;
  parameters.dao = dao.address;
  await saveParameters(parameters);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });