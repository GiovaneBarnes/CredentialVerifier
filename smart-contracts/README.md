# Credential Verifier Smart Contracts

This project contains Ethereum smart contracts for issuing and verifying digital credentials on the blockchain.

## Contracts

### CredentialVerifier.sol

A smart contract that allows authorized issuers to create, manage, and verify digital credentials.

#### Features

- **Multi-issuer support**: Owner can authorize multiple addresses to issue credentials
- **Credential lifecycle**: Issue, revoke, and query credentials
- **Immutable records**: All credential data is stored permanently on the blockchain
- **Access control**: Only authorized issuers can modify credentials
- **Events**: Emits events for all state changes for better tracking

#### Functions

- `addAuthorizeIssuer(address issuer)`: Authorize a new issuer (owner only)
- `revokeAuthorizeIssue(address issuer)`: Revoke issuer authorization (owner only)
- `addCredential(string recipientName, string degree, bytes32 idHash)`: Issue a new credential
- `revokeCredential(bytes32 idHash)`: Revoke an existing credential
- `getCredential(bytes32 idHash)`: Get full credential details
- `getCredentialStatus(bytes32 idHash)`: Get credential status (Issued/Revoked)

#### Events

- `CredentialIssued(bytes32 idHash, string recipientName, string degree)`
- `CredentialRevoked(bytes32 idHash)`
- `IssuerAuthorized(address issuer)`
- `IssuerRevoked(address issuer)`

## Testing

Run the comprehensive test suite:

```shell
npx hardhat test
```

The tests cover:
- Contract deployment and initialization
- Issuer authorization management
- Credential issuance and revocation
- Access control and error handling
- Event emission verification

## Deployment

Deploy to a local network:

```shell
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/CredentialVerifier.js
```

## Security Considerations

- Only the contract owner can authorize/revoke issuers
- Input validation prevents empty strings and invalid addresses
- Credentials cannot be modified once issued (except revocation)
- All state changes emit events for transparency

## Integration

This contract integrates with the backend service in `../backend/` which provides REST API endpoints for credential management.
