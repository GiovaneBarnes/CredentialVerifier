// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CredentialVerifier {
    address public owner;

    enum Status {Issued, Revoked}

    struct Credential {
        string recipientName;
        string degree;
        uint256 issuedAt;
        Status status;
    }

    mapping(address => bool) public authorizedIssuer;
    mapping(bytes32 => Credential) public credentials;

    modifier onlyIssuer() {
        require(authorizedIssuer[msg.sender], "Not authorized to issue, begone!");
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedIssuer[msg.sender] = true;
    }

    function addAuthorizeIssuer(address issuer) external onlyIssuer {
        authorizedIssuer[issuer] = true;
    }

    function revokeAuthorizeIssue(address issuer) external onlyIssuer {
        authorizedIssuer[issuer] = false;
    }

    function addCredential(string memory recipientName, string memory degree, bytes32 idHash) external onlyIssuer {
        require(credentials[idHash].issuedAt == 0, "Credential already exists");
        credentials[idHash] = Credential(recipientName, degree, block.timestamp, Status.Issued);
    }

    function revokeCredential(bytes32 idHash) external onlyIssuer {
        require(credentials[idHash].issuedAt != 0, "Credential doesn't exist");
        credentials[idHash].status = Status.Revoked;
    }

    function getCredentialStatus(bytes32 idHash) public view returns (Status) {
        require(credentials[idHash].issuedAt != 0, "Credential doesn't exist");
        return credentials[idHash].status;
    }

    function getCredential(bytes32 idHash) public view returns (Credential memory) {
        require(credentials[idHash].issuedAt != 0, "Credential doesn't exist");
        return credentials[idHash];
    }
}
