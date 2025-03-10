import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function loadParameters() {
    const parametersPath = path.join(__dirname, "..", "parameters.json");
    const parameters = JSON.parse(fs.readFileSync(parametersPath, "utf8"));
    return parameters;
}

async function saveParameters(parameters: any) {
    const parametersPath = path.join(__dirname, "..", "parameters.json");
    fs.writeFileSync(parametersPath, JSON.stringify(parameters, null, 2));
}

async function deployAllProcessContracts() {
    const parameters = await loadParameters();

    // بررسی وجود آدرس AccControl و CustomHash
    if (!parameters.accControl || !parameters.customHash) {
        console.error("Error: AccControl or CustomHash is not deployed. Please deploy platform contracts first.");
        process.exit(1);
    }

    // آدرس‌های تست
    const testAddresses = {
        initialOwner: "0xc73a9048bf40235A1BACBB1Bd88670D3272469Dc",
        initialSupply: "1000000000000000000000" // 1000 توکن
    };

    try {
        // استقرار Token
        console.log("Deploying Token...");
        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy(
            testAddresses.initialSupply,
            testAddresses.initialOwner,
            parameters.accControl,
            parameters.customHash
        );
        await token.deployed();
        console.log(`Token deployed at: ${token.address}`);

        // ذخیره اطلاعات Token
        if (!parameters.Token) parameters.Token = {};
        parameters.Token["MainToken"] = {
            address: token.address,
            initialSupply: testAddresses.initialSupply,
            owner: testAddresses.initialOwner
        };

        // استقرار Voting
        console.log("Deploying Voting...");
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy(
            testAddresses.initialOwner,
            parameters.accControl,
            parameters.customHash
        );
        await voting.deployed();
        console.log(`Voting deployed at: ${voting.address}`);

        // ذخیره اطلاعات Voting
        if (!parameters.Voting) parameters.Voting = {};
        parameters.Voting["MainVoting"] = {
            address: voting.address,
            owner: testAddresses.initialOwner
        };

        // استقرار ProjectMon
        console.log("Deploying ProjectMon...");
        const ProjectMon = await ethers.getContractFactory("ProjectMon");
        const projectMon = await ProjectMon.deploy(
            testAddresses.initialOwner,
            parameters.accControl,
            parameters.customHash
        );
        await projectMon.deployed();
        console.log(`ProjectMon deployed at: ${projectMon.address}`);

        // ذخیره اطلاعات ProjectMon
        if (!parameters.ProjectMon) parameters.ProjectMon = {};
        parameters.ProjectMon["MainProjectMon"] = {
            address: projectMon.address,
            owner: testAddresses.initialOwner
        };

        // ذخیره تمام اطلاعات در فایل
        await saveParameters(parameters);
        console.log("All process contracts deployed successfully!");
        console.log("Parameters saved to parameters.json");

    } catch (error) {
        console.error("Error deploying contracts:", error);
        process.exit(1);
    }
}

// اجرای تابع استقرار
deployAllProcessContracts()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });