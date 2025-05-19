const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CredentialVerifier", function () {
    let contract;
    let owner;

    beforeEach(async () => {
        [owner] = await ethers.getSigners();
        const CredentialVerifier = await ethers.getContractFactory("CredentialVerifier");
        contract = await CredentialVerifier.deploy();
        await contract.deployed();
    });

    it("should revert when trying to fetch a non-existent credential", async () => {
        const idHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("fakeUser@example.edu"));

        await expect(contract.getCredential(idHash)).to.be.revertedWith("Credential doesn't exist");
    });

    it("should return credential data if it exists", async () => {
        const id = "student123";
        const idHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(id));

        await contract.authorizeIssuer(owner.address);
        await contract.issueCredential(idHash, "John Doe", "BS Computer Science");

        const result = await contract.getCredential(idHash);
        expect(result.recipientName).to.equal("John Doe");
    });


});
