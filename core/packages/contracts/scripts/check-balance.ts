import { ethers } from "hardhat";

async function checkBalance() {
    try {
        const [deployer] = await ethers.getSigners();
        const balance = await deployer.getBalance();
        console.log(`Deployer address: ${deployer.address}`);
        console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);
        
        // بررسی موجودی سایر حساب‌ها
        const accounts = await ethers.provider.listAccounts();
        console.log("\nOther accounts:");
        for (const account of accounts) {
            const balance = await ethers.provider.getBalance(account);
            console.log(`${account}: ${ethers.utils.formatEther(balance)} ETH`);
        }
    } catch (error) {
        console.error("Error checking balance:", error);
    }
}

checkBalance()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 