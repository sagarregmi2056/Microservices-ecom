import * as fs from "fs";
import * as path from "path";

const envPath = path.resolve(__dirname, "../../../.env");
const envFile = fs.readFileSync(envPath, "utf8");
const envVariables = envFile.split("\n");

envVariables.forEach((envVar) => {
  const [key, value] = envVar.split("=");
  process.env[key] = value;
});
