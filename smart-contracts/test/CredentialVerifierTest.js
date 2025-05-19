const { expect } = require("chai");
const { ethers } = require("hardhat");
const { keccak256 } = require("js-sha3");

describe("CredentialVerifier", function () {
    let contract;
    let owner;

    beforeEach(async () => {
        [owner] = await ethers.getSigners();
        const CredentialVerifier = await ethers.getContractFactory("CredentialVerifier");
        contract = await CredentialVerifier.deploy();
    });

    it("should revert when trying to fetch a non-existent credential", async () => {
        const idHash = "0x" + keccak256("fakeUser@example.edu");

        await expect(contract.getCredential(idHash)).to.be.revertedWith("Credential doesn't exist");
    });

    it("should return credential data if it exists", async () => {
        const id = "student123";
        const idHash = "0x" + keccak256(id);

        await contract.addAuthorizeIssuer(owner.address);
        await contract.addCredential("John Doe", "BS Computer Science", idHash);

        const result = await contract.getCredential(idHash);
        expect(result.recipientName).to.equal("John Doe");
    });


});
