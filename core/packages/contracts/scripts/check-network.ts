import { ethers } from "hardhat";

async function checkNetwork() {
    try {
        const provider = ethers.provider;
        const network = await provider.getNetwork();
        const blockNumber = await provider.getBlockNumber();
        const accounts = await provider.listAccounts();
        
        console.log("Network Information:");
        console.log(`Chain ID: ${network.chainId}`);
        console.log(`Name: ${network.name}`);
        console.log(`Current Block: ${blockNumber}`);
        console.log("\nAvailable Accounts:");
        accounts.forEach((account, index) => {
            console.log(`${index}: ${account}`);
        });
    } catch (error) {
        console.error("Error connecting to network:", error);
    }
}

checkNetwork()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 