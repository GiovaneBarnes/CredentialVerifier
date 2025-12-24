import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

// Mock axios to avoid actual API calls
vi.mock('axios')

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  it('renders the main application with header', () => {
    render(<App />)

    expect(screen.getByText('Credential Verifier')).toBeInTheDocument()
    expect(screen.getByText('Secure blockchain-based credential verification')).toBeInTheDocument()
    expect(screen.getByText('Powered by Ethereum')).toBeInTheDocument()
  })

  it('renders all navigation tabs', () => {
    render(<App />)

    expect(screen.getByText('View Credentials')).toBeInTheDocument()
    expect(screen.getByText('Issue Credential')).toBeInTheDocument()
    expect(screen.getByText('Verify Credential')).toBeInTheDocument()
  })

  it('starts with View Credentials tab active by default', () => {
    render(<App />)

    // The View Credentials tab should be active (have different styling)
    const viewTab = screen.getByText('View Credentials')
    expect(viewTab).toBeInTheDocument()

    // Check that ViewCredentials component is rendered (by checking for its content)
    expect(screen.getByText('Credentials')).toBeInTheDocument()
  })

  it('switches to Issue Credential tab when clicked', async () => {
    render(<App />)

    const issueTab = screen.getByText('Issue Credential')
    fireEvent.click(issueTab)

    // Check that IssueCredential component is rendered
    expect(screen.getByText('Issue New Credential')).toBeInTheDocument()
    expect(screen.getByText('Create a new digital credential on the blockchain')).toBeInTheDocument()
  })

  it('switches to Verify Credential tab when clicked', async () => {
    render(<App />)

    const verifyTab = screen.getByText('Verify Credential')
    fireEvent.click(verifyTab)

    // Check that VerifyCredential component is rendered by looking for its heading
    expect(screen.getByRole('heading', { name: 'Verify Credential' })).toBeInTheDocument()
  })

  it('displays sample credentials on initial load', () => {
    render(<App />)

    // Check for sample credential data
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Bachelor of Science in Computer Science')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Master of Business Administration')).toBeInTheDocument()
  })

  it('has proper responsive design classes', () => {
    render(<App />)

    // Check for responsive classes in the main container
    const mainContainer = screen.getByRole('main')
    expect(mainContainer).toHaveClass('max-w-7xl', 'mx-auto', 'py-8', 'sm:px-6', 'lg:px-8')
  })

  it('includes accessibility features', () => {
    render(<App />)

    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toHaveTextContent('Credential Verifier')

    // Check for navigation landmark
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('has modern visual design elements', () => {
    render(<App />)

    // Check for key visual elements that indicate modern design
    expect(screen.getByText('Powered by Ethereum')).toBeInTheDocument()

    // Check that the main container has the gradient background class
    const mainContainer = document.querySelector('.min-h-screen')
    expect(mainContainer).toHaveClass('bg-gradient-to-br')
  })
})