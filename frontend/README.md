# Credential Verifier Frontend

A modern React frontend for the blockchain-based credential verification system.

## Features

- **Issue Credentials**: Create new digital credentials on the blockchain
- **View Credentials**: Browse all issued and revoked credentials
- **Verify Credentials**: Check credential validity using unique hashes
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live credential status and blockchain integration

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/
│   ├── IssueCredential.tsx    # Form for issuing new credentials
│   ├── ViewCredentials.tsx    # Grid display of all credentials
│   └── VerifyCredential.tsx   # Credential verification interface
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles with Tailwind
```

## API Integration

The frontend communicates with the Spring Boot backend API:

- `POST /credentials` - Issue new credential
- `GET /credentials/{idHash}` - Retrieve specific credential

## Features Overview

### Issue Credential
- Form validation for required fields
- Automatic hash generation for uniqueness
- Loading states and success/error feedback
- Integration with blockchain transaction monitoring

### View Credentials
- Card-based layout for easy browsing
- Status indicators (Issued/Revoked)
- Timestamp formatting
- Refresh functionality for real-time updates

### Verify Credential
- Hash-based credential lookup
- Visual status verification
- Detailed credential information display
- Error handling for invalid hashes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Styling

The application uses Tailwind CSS for styling with a custom design system:

- Blue color scheme for primary actions
- Gray scale for neutral elements
- Green/Red for status indicators
- Responsive grid layouts

## Deployment

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Integration with Backend

Ensure the backend is running on the expected port (default: 8080) for full functionality. The frontend includes mock data for demonstration purposes when the backend is unavailable.
