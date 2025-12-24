# Credential Verifier Backend

A Spring Boot microservice for issuing and verifying blockchain-based credentials using Web3j and Ethereum smart contracts.

## Features

- Issue digital credentials on the blockchain
- Retrieve and verify issued credentials
- RESTful API endpoints
- Integration with Ethereum smart contracts

## API Endpoints

### Issue Credential
- **POST** `/credentials`
- **Body**: JSON
  ```json
  {
    "recipientName": "John Doe",
    "degree": "Bachelor of Science",
    "idHash": "unique-hash-123"
  }
  ```
- **Response**: Transaction hash string

### Get Credential
- **GET** `/credentials/{idHash}`
- **Response**: Credential JSON
  ```json
  {
    "recipientName": "John Doe",
    "degree": "Bachelor of Science",
    "idHash": "unique-hash-123",
    "issuedAt": 1640995200,
    "status": 0
  }
  ```

## Configuration

Create a `.env` file in the backend directory with:

```
PrivateKey=your-ethereum-private-key
ContractAddress=deployed-contract-address
```

## Running the Application

1. Ensure Ganache or local Ethereum network is running on `http://localhost:8545`
2. Deploy the smart contract from the `smart-contracts` directory
3. Update `.env` with contract address
4. Run: `./mvnw spring-boot:run`

## Testing

Run tests with: `./mvnw test`

## Technologies

- Spring Boot 3.4.5
- Web3j
- Ethereum Smart Contracts
- JUnit 5
- Mockito