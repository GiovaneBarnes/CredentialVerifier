// extractAbiBin.js
const fs = require("fs");
const artifact = require("./artifacts/contracts/CredentialVerifier.sol/CredentialVerifier.json");

fs.writeFileSync("CredentialVerifier.abi", JSON.stringify(artifact.abi, null, 2));
fs.writeFileSync("CredentialVerifier.bin", artifact.bytecode);

