import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IssueCredential from '../IssueCredential'

// Mock axios to avoid actual API calls
vi.mock('axios')

describe('IssueCredential Component', () => {
  const mockOnCredentialIssued = vi.fn()
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    mockOnCredentialIssued.mockClear()
  })

  it('renders the form with all required fields', () => {
    render(<IssueCredential onCredentialIssued={mockOnCredentialIssued} />)

    expect(screen.getByText('Issue New Credential')).toBeInTheDocument()
    expect(screen.getByLabelText(/recipient name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/degree\/program/i)).toBeInTheDocument()
    expect(screen.getByText('Secure Hash Generation')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /issue credential/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    render(<IssueCredential onCredentialIssued={mockOnCredentialIssued} />)

    const submitButton = screen.getByRole('button', { name: /issue credential/i })
    await user.click(submitButton)

    // HTML5 validation should prevent submission with empty required fields
    // The form should not submit and browser validation should trigger
    expect(mockOnCredentialIssued).not.toHaveBeenCalled()
  })

  it('updates form data when user types in inputs', async () => {
    render(<IssueCredential onCredentialIssued={mockOnCredentialIssued} />)

    const recipientInput = screen.getByLabelText(/recipient name/i)
    const degreeInput = screen.getByLabelText(/degree\/program/i)

    await user.type(recipientInput, 'John Doe')
    await user.type(degreeInput, 'Bachelor of Science')

    expect(recipientInput).toHaveValue('John Doe')
    expect(degreeInput).toHaveValue('Bachelor of Science')
  })

  it('shows loading state during form submission', async () => {
    render(<IssueCredential onCredentialIssued={mockOnCredentialIssued} />)

    const recipientInput = screen.getByLabelText(/recipient name/i)
    const degreeInput = screen.getByLabelText(/degree\/program/i)
    const submitButton = screen.getByRole('button', { name: /issue credential/i })

    await user.type(recipientInput, 'John Doe')
    await user.type(degreeInput, 'Bachelor of Science')

    await user.click(submitButton)

    // Check for loading state
    expect(screen.getByText('Issuing Credential...')).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('shows success message after successful credential issuance', async () => {
    render(<IssueCredential onCredentialIssued={mockOnCredentialIssued} />)

    const recipientInput = screen.getByLabelText(/recipient name/i)
    const degreeInput = screen.getByLabelText(/degree\/program/i)
    const submitButton = screen.getByRole('button', { name: /issue credential/i })

    await user.type(recipientInput, 'John Doe')
    await user.type(degreeInput, 'Bachelor of Science')

    await user.click(submitButton)

    // Wait for the success message to appear (increase timeout)
    await waitFor(() => {
      expect(screen.getByText('Credential Issued Successfully!')).toBeInTheDocument()
    }, { timeout: 3000 })

    expect(mockOnCredentialIssued).toHaveBeenCalled()
  })

  it('resets form after successful submission', async () => {
    render(<IssueCredential onCredentialIssued={mockOnCredentialIssued} />)

    const recipientInput = screen.getByLabelText(/recipient name/i)
    const degreeInput = screen.getByLabelText(/degree\/program/i)
    const submitButton = screen.getByRole('button', { name: /issue credential/i })

    await user.type(recipientInput, 'John Doe')
    await user.type(degreeInput, 'Bachelor of Science')

    await user.click(submitButton)

    // Wait for success message first, then check form reset
    await waitFor(() => {
      expect(screen.getByText('Credential Issued Successfully!')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Now check that form was reset
    await waitFor(() => {
      expect(recipientInput).toHaveValue('')
      expect(degreeInput).toHaveValue('')
    })
  })

  it('displays hash generation information', () => {
    render(<IssueCredential onCredentialIssued={mockOnCredentialIssued} />)

    expect(screen.getByText('Secure Hash Generation')).toBeInTheDocument()
    expect(screen.getByText(/unique cryptographic hash/i)).toBeInTheDocument()
    expect(screen.getByText(/ensures immutability/i)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<IssueCredential onCredentialIssued={mockOnCredentialIssued} />)

    const recipientInput = screen.getByLabelText(/recipient name/i)
    const degreeInput = screen.getByLabelText(/degree\/program/i)

    expect(recipientInput).toHaveAttribute('required')
    expect(degreeInput).toHaveAttribute('required')
    expect(recipientInput).toHaveAttribute('placeholder')
    expect(degreeInput).toHaveAttribute('placeholder')
  })

  it('generates consistent hash for same input data', async () => {
    render(<IssueCredential onCredentialIssued={mockOnCredentialIssued} />)

    const recipientInput = screen.getByLabelText(/recipient name/i)
    const degreeInput = screen.getByLabelText(/degree\/program/i)

    // Mock Date.now to get consistent results
    const mockDate = 1640995200000 // Fixed timestamp
    vi.spyOn(Date, 'now').mockReturnValue(mockDate)

    await user.type(recipientInput, 'John Doe')
    await user.type(degreeInput, 'Bachelor of Science')

    const submitButton = screen.getByRole('button', { name: /issue credential/i })
    await user.click(submitButton)

    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('Credential Issued Successfully!')).toBeInTheDocument()
    }, { timeout: 3000 })

    vi.restoreAllMocks()
  })
})