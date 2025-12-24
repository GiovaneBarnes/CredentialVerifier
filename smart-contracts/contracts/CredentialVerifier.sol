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

    event CredentialIssued(bytes32 indexed idHash, string recipientName, string degree);
    event CredentialRevoked(bytes32 indexed idHash);
    event IssuerAuthorized(address indexed issuer);
    event IssuerRevoked(address indexed issuer);

    modifier onlyIssuer() {
        require(authorizedIssuer[msg.sender], "Not authorized to issue, begone!");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedIssuer[msg.sender] = true;
    }

    function addAuthorizeIssuer(address issuer) external onlyOwner {
        require(issuer != address(0), "Invalid issuer address");
        require(!authorizedIssuer[issuer], "Issuer already authorized");
        authorizedIssuer[issuer] = true;
        emit IssuerAuthorized(issuer);
    }

    function revokeAuthorizeIssue(address issuer) external onlyOwner {
        require(authorizedIssuer[issuer], "Issuer not authorized");
        authorizedIssuer[issuer] = false;
        emit IssuerRevoked(issuer);
    }

    function addCredential(string memory recipientName, string memory degree, bytes32 idHash) external onlyIssuer {
        require(credentials[idHash].issuedAt == 0, "Credential already exists");
        require(bytes(recipientName).length > 0, "Recipient name cannot be empty");
        require(bytes(degree).length > 0, "Degree cannot be empty");
        require(idHash != bytes32(0), "Invalid ID hash");

        credentials[idHash] = Credential(recipientName, degree, block.timestamp, Status.Issued);
        emit CredentialIssued(idHash, recipientName, degree);
    }

    function revokeCredential(bytes32 idHash) external onlyIssuer {
        require(credentials[idHash].issuedAt != 0, "Credential doesn't exist");
        require(credentials[idHash].status == Status.Issued, "Credential already revoked");

        credentials[idHash].status = Status.Revoked;
        emit CredentialRevoked(idHash);
    }

    function getCredentialStatus(bytes32 idHash) public view returns (Status) {
        require(credentials[idHash].issuedAt != 0, "Credential doesn't exist");
        return credentials[idHash].status;
    }

    function getCredential(bytes32 idHash) public view returns (Credential memory) {
        require(credentials[idHash].issuedAt != 0, "Credential doesn't exist");
        return credentials[idHash];
    }

    function isAuthorizedIssuer(address issuer) public view returns (bool) {
        return authorizedIssuer[issuer];
    }
}
