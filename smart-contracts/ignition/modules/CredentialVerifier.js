const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1_2030 = 1893456000;

module.exports = buildModule("CredentialVerifierModule", (m) => {
  const credentialVerifier = m.contract("CredentialVerifier", []);

  return { credentialVerifier };
});