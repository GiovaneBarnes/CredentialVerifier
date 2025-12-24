const { expect } = require("chai");
const { ethers } = require("hardhat");
const { keccak256 } = require("js-sha3");

describe("CredentialVerifier", function () {
    let contract;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();
        const CredentialVerifier = await ethers.getContractFactory("CredentialVerifier");
        contract = await CredentialVerifier.deploy();
    });

    describe("Deployment", function () {
        it("Should set the owner correctly", async function () {
            expect(await contract.owner()).to.equal(owner.address);
        });

        it("Should authorize the owner as issuer", async function () {
            expect(await contract.authorizedIssuer(owner.address)).to.equal(true);
        });
    });

    describe("Issuer Management", function () {
        it("Should allow owner to add authorized issuer", async function () {
            await contract.addAuthorizeIssuer(addr1.address);
            expect(await contract.authorizedIssuer(addr1.address)).to.equal(true);
        });

        it("Should allow owner to revoke authorized issuer", async function () {
            await contract.addAuthorizeIssuer(addr1.address);
            await contract.revokeAuthorizeIssue(addr1.address);
            expect(await contract.authorizedIssuer(addr1.address)).to.equal(false);
        });

        it("Should revert when non-owner tries to add issuer", async function () {
            await expect(contract.connect(addr1).addAuthorizeIssuer(addr2.address))
                .to.be.revertedWith("Only owner can perform this action");
        });

        it("Should revert when non-owner tries to revoke issuer", async function () {
            await contract.addAuthorizeIssuer(addr1.address);
            await expect(contract.connect(addr1).revokeAuthorizeIssue(addr1.address))
                .to.be.revertedWith("Only owner can perform this action");
        });
    });

    describe("Credential Management", function () {
        let idHash;

        beforeEach(async () => {
            idHash = "0x" + keccak256("student123");
            // Owner is already authorized in constructor, no need to add again
        });

        it("Should add a credential successfully", async function () {
            await expect(contract.addCredential("John Doe", "BS Computer Science", idHash))
                .to.emit(contract, "CredentialIssued") // We'll add this event
                .withArgs(idHash, "John Doe", "BS Computer Science");

            const credential = await contract.getCredential(idHash);
            expect(credential.recipientName).to.equal("John Doe");
            expect(credential.degree).to.equal("BS Computer Science");
            expect(credential.status).to.equal(0); // Issued
            expect(credential.issuedAt).to.be.gt(0);
        });

        it("Should revert when adding duplicate credential", async function () {
            await contract.addCredential("John Doe", "BS Computer Science", idHash);
            await expect(contract.addCredential("Jane Doe", "MS Computer Science", idHash))
                .to.be.revertedWith("Credential already exists");
        });

        it("Should revert when non-authorized user tries to add credential", async function () {
            await expect(contract.connect(addr1).addCredential("John Doe", "BS Computer Science", idHash))
                .to.be.revertedWith("Not authorized to issue, begone!");
        });

        it("Should revoke a credential", async function () {
            await contract.addCredential("John Doe", "BS Computer Science", idHash);
            await expect(contract.revokeCredential(idHash))
                .to.emit(contract, "CredentialRevoked") // We'll add this event
                .withArgs(idHash);

            expect(await contract.getCredentialStatus(idHash)).to.equal(1); // Revoked
        });

        it("Should revert when revoking non-existent credential", async function () {
            await expect(contract.revokeCredential(idHash))
                .to.be.revertedWith("Credential doesn't exist");
        });

        it("Should revert when non-authorized user tries to revoke credential", async function () {
            await contract.addCredential("John Doe", "BS Computer Science", idHash);
            await expect(contract.connect(addr1).revokeCredential(idHash))
                .to.be.revertedWith("Not authorized to issue, begone!");
        });
    });

    describe("Credential Retrieval", function () {
        let idHash;

        beforeEach(async () => {
            idHash = "0x" + keccak256("student123");
            await contract.addCredential("John Doe", "BS Computer Science", idHash);
        });

        it("Should return correct credential data", async function () {
            const result = await contract.getCredential(idHash);
            expect(result.recipientName).to.equal("John Doe");
            expect(result.degree).to.equal("BS Computer Science");
            expect(result.status).to.equal(0); // Issued
            expect(result.issuedAt).to.be.a('bigint').and.to.be.gt(0);
        });

        it("Should return correct status for issued credential", async function () {
            expect(await contract.getCredentialStatus(idHash)).to.equal(0); // Issued
        });

        it("Should return correct status for revoked credential", async function () {
            await contract.revokeCredential(idHash);
            expect(await contract.getCredentialStatus(idHash)).to.equal(1); // Revoked
        });

        it("Should revert when getting non-existent credential", async function () {
            const fakeHash = "0x" + keccak256("nonexistent");
            await expect(contract.getCredential(fakeHash)).to.be.revertedWith("Credential doesn't exist");
            await expect(contract.getCredentialStatus(fakeHash)).to.be.revertedWith("Credential doesn't exist");
        });
    });
});
