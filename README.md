# Credential Verifier

A complete blockchain-based digital credential verification system with smart contracts, Spring Boot backend, and React frontend.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │ Spring Boot API │    │  Smart Contracts │
│                 │    │                 │    │                 │
│ - Issue Creds   │◄──►│ - REST Endpoints│◄──►│ - Ethereum       │
│ - View Creds    │    │ - Web3j Client  │    │ - Access Control │
│ - Verify Creds  │    │ - Data Mapping  │    │ - Events         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
credential-verifier/
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   │   └── com/giovanebarnes/backend/
│   │       ├── controller/  # REST controllers
│   │       ├── service/     # Business logic
│   │       ├── model/       # Data models
│   │       └── config/      # Configuration
│   └── src/test/            # Unit tests (JUnit)
├── frontend/                # React TypeScript app
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── __tests__/   # Component tests
│   │   ├── __tests__/       # App-level tests
│   │   ├── test/            # Test utilities
│   │   └── App.tsx          # Main app
│   └── public/              # Static assets
├── smart-contracts/         # Hardhat project
│   ├── contracts/           # Solidity contracts
│   ├── test/                # Contract tests (Hardhat)
│   └── scripts/             # Deployment scripts
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Java 17+
- npm/yarn
- Hardhat
- Ganache (for local blockchain)

### 1. Start Local Blockchain

```bash
npm install -g ganache-cli
ganache-cli
```

### 2. Deploy Smart Contracts

```bash
cd smart-contracts
npm install
npx hardhat run scripts/deploy.js --network localhost
```

Update `backend/.env` with the deployed contract address.

### 3. Start Backend

```bash
cd backend
./mvnw spring-boot:run
```

### 4. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173/

## 🔧 Configuration

### Backend (.env)

```env
PrivateKey=your-ethereum-private-key
ContractAddress=deployed-contract-address
```

### Smart Contracts

Update `hardhat.config.js` with your network configurations.

## 📋 Features

### Smart Contracts
- ✅ Multi-issuer credential system
- ✅ Credential issuance and revocation
- ✅ Access control with owner/issuer roles
- ✅ Event logging for transparency
- ✅ Input validation and security checks

### Backend API
- ✅ RESTful endpoints for credential operations
- ✅ Web3j integration with Ethereum
- ✅ Comprehensive error handling
- ✅ Unit tests with Mockito

### Frontend
- ✅ **Modern React with TypeScript** and Vite
- ✅ **Beautiful UI with Tailwind CSS v4** - gradients, glass morphism, animations
- ✅ **Responsive design** that works on all devices
- ✅ **Real-time credential management** with live updates
- ✅ **Credential verification interface** with status indicators
- ✅ **Loading states and user feedback** with smooth transitions
- ✅ **Comprehensive test coverage** with Vitest and React Testing Library

## 🧪 Testing

### Smart Contracts
```bash
cd smart-contracts
npx hardhat test
```

### Backend
```bash
cd backend
./mvnw test
```

### Frontend
```bash
cd frontend
npm test                    # Run tests in watch mode
npm run test:run           # Run tests once
npm run test:ui            # Run tests with UI
```

**Test Coverage:**
- **18 comprehensive tests** covering all major components
- **Component rendering** and interaction tests
- **Form validation** and submission testing
- **State management** and user feedback
- **Integration tests** for component communication

## 🎨 Design Features

### Modern UI/UX
- **Glass Morphism**: Semi-transparent backgrounds with backdrop blur effects
- **Gradient Accents**: Beautiful blue-to-purple gradients throughout the interface
- **Smooth Animations**: Subtle animations and transitions for better user experience
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Proper ARIA labels, keyboard navigation, and screen reader support

### Visual Elements
- **Animated Background**: Floating gradient orbs with pulse animations
- **Interactive Components**: Hover effects, focus states, and visual feedback
- **Professional Typography**: Clean, readable fonts with proper hierarchy
- **Consistent Color Scheme**: Cohesive blue and purple theme with proper contrast

## 📚 API Documentation

### Issue Credential
```http
POST /credentials
Content-Type: application/json

{
  "recipientName": "John Doe",
  "degree": "Bachelor of Science",
  "idHash": "unique-hash"
}
```

### Get Credential
```http
GET /credentials/{idHash}
```

### Verify Credential
```http
GET /credentials/{idHash}
```

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript for modern component development
- **Vite** for fast development and optimized builds
- **Tailwind CSS v4** for utility-first styling with modern features
- **Lucide React** for beautiful, consistent icons
- **Vitest** + **React Testing Library** for comprehensive testing
- **Axios** for HTTP client communication

### Backend
- **Spring Boot 3.4.5** with Java 17
- **Web3j** for Ethereum blockchain integration
- **Spring Web** for REST API development
- **JUnit 5** + **Mockito** for unit testing
- **Maven** for dependency management

### Smart Contracts
- **Solidity** for Ethereum smart contract development
- **Hardhat** for development environment and testing
- **OpenZeppelin** for secure contract patterns
- **Ethers.js** for contract interaction

### Development Tools
- **ESLint** + **Prettier** for code quality
- **Git** for version control
- **npm** for package management
- **PostCSS** for CSS processing

## 🚀 Deployment

### Production Checklist

- [ ] Update contract addresses in configuration
- [ ] Configure production Ethereum network
- [ ] Set up SSL certificates
- [ ] Configure CORS for frontend domain
- [ ] Set up monitoring and logging

### Build Commands

```bash
# Backend
cd backend && ./mvnw clean package -DskipTests

# Frontend
cd frontend && npm run build

# Smart Contracts
cd smart-contracts && npx hardhat compile
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenZeppelin** for secure smart contract patterns and utilities
- **Hardhat** for comprehensive Ethereum development tools
- **Spring Boot** for robust Java backend framework
- **React** and **Vite** for modern frontend development
- **Tailwind CSS** for utility-first styling framework
- **Vitest** and **React Testing Library** for excellent testing tools
- **Web3j** for seamless Java-Ethereum integration
- **Lucide** for beautiful, consistent iconography