import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { artifacts } from "hardhat";

async function main() {
  // Create directories if they don't exist
  const abiDir = join(__dirname, "../frontend/src/abi");
  const typesDir = join(__dirname, "../frontend/src/types");

  if (!existsSync(abiDir)) {
    mkdirSync(abiDir, { recursive: true });
  }
  if (!existsSync(typesDir)) {
    mkdirSync(typesDir, { recursive: true });
  }

  // List of contracts to generate types for
  const contracts = [
    "Token",
    "CustomHash",
    "AccControl",
    "Finance",
    "Staking",
    "Voting",
    "DAO"
  ];

  console.log("Generating contract types and ABIs...");

  for (const contractName of contracts) {
    try {
      // Get contract artifact
      const artifact = await artifacts.readArtifact(contractName);

      // Generate ABI file
      const abiPath = join(abiDir, `${contractName}.json`);
      writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));
      console.log(`Generated ABI for ${contractName}`);

      // Generate TypeScript interface
      const tsInterface = generateTypeScriptInterface(contractName, artifact.abi);
      const typesPath = join(typesDir, `${contractName}.ts`);
      writeFileSync(typesPath, tsInterface);
      console.log(`Generated TypeScript interface for ${contractName}`);

    } catch (error) {
      console.error(`Error generating types for ${contractName}:`, error);
    }
  }

  // Generate index file for types
  const indexContent = contracts
    .map(name => `export * from './${name}';`)
    .join("\n");
  writeFileSync(join(typesDir, "index.ts"), indexContent);

  console.log("\nGeneration completed!");
}

function generateTypeScriptInterface(contractName: string, abi: any[]): string {
  let output = `import { ethers } from 'ethers';\n\n`;
  output += `export interface ${contractName}Interface {\n`;

  // Generate function interfaces
  for (const item of abi) {
    if (item.type === "function") {
      const inputs = item.inputs
        .map((input: any) => `${input.name}: ${getTypeScriptType(input.type)}`)
        .join(", ");

      const outputs = item.outputs
        ? item.outputs.length === 1
          ? getTypeScriptType(item.outputs[0].type)
          : `[${item.outputs.map((output: any) => getTypeScriptType(output.type)).join(", ")}]`
        : "void";

      const returnType = item.stateMutability === "view" || item.stateMutability === "pure"
        ? `Promise<${outputs}>`
        : "Promise<ethers.ContractTransaction>";

      output += `  ${item.name}(${inputs}): ${returnType};\n`;
    }
  }

  output += "}\n\n";

  // Generate event interfaces
  for (const item of abi) {
    if (item.type === "event") {
      output += `export interface ${contractName}${item.name}Event {\n`;
      for (const input of item.inputs) {
        output += `  ${input.name}: ${getTypeScriptType(input.type)};\n`;
      }
      output += "}\n\n";
    }
  }

  return output;
}

function getTypeScriptType(solidityType: string): string {
  if (solidityType.includes("int")) {
    return "ethers.BigNumber";
  }
  if (solidityType === "address") {
    return "string";
  }
  if (solidityType === "bool") {
    return "boolean";
  }
  if (solidityType === "string") {
    return "string";
  }
  if (solidityType.includes("bytes")) {
    return "string";
  }
  if (solidityType.includes("[]")) {
    const baseType = solidityType.replace("[]", "");
    return `${getTypeScriptType(baseType)}[]`;
  }
  return "any";
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  }); 