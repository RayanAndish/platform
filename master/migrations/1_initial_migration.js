const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer, network, accounts) {
  try {
    console.log("Starting 1_initial_migration...");
    console.log(`Network: ${network}`);
    console.log(`Deployer account: ${accounts[0]}`);

    // بررسی آدرس حساب deployer
    if (!web3.utils.isAddress(accounts[0])) {
      throw new Error(`Invalid deployer account address: ${accounts[0]}`);
    }

    // چاپ موجودی حساب deployer
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log(`Deployer account balance: ${balance}`);

    // استقرار قرارداد Migrations
    console.log("Deploying Migrations contract...");
    await deployer.deploy(Migrations, { from: accounts[0], gas: 8000000, gasPrice: web3.utils.toWei("20", "gwei") });

    console.log("Migrations contract deployed.");
    const migrationsInstance = await Migrations.deployed();

    console.log(`Migrations deployed at: ${migrationsInstance.address}`);

    // ذخیره‌سازی اطلاعات مهاجرت
    console.log("Saving migration to chain...");
    await migrationsInstance.setCompleted(1, { from: accounts[0] });
    console.log("Migration saved to chain.");
  } catch (error) {
    console.error("Error in 1_initial_migration:", error);
    process.exit(1); // توقف اسکریپت در صورت وقوع خطا
  }
}