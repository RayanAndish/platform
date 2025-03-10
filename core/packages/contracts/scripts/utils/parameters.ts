import * as fs from "fs";
import * as path from "path";

export async function loadParameters() {
  const parametersPath = path.join(__dirname, "..", "..", "parameters.json");
  const parameters = JSON.parse(fs.readFileSync(parametersPath, "utf8"));
  return parameters;
}

export async function saveParameters(parameters: any) {
  const parametersPath = path.join(__dirname, "..", "..", "parameters.json");
  fs.writeFileSync(parametersPath, JSON.stringify(parameters, null, 2));
} 