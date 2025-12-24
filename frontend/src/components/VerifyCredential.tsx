import { useState } from 'react'
import { Search, CheckCircle, XCircle, AlertCircle, Hash } from 'lucide-react'

interface Credential {
  recipientName: string
  degree: string
  idHash: string
  issuedAt: number
  status: number
}

function VerifyCredential() {
  const [idHash, setIdHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    found: boolean
    credential?: Credential
    error?: string
  } | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      // In a real app, this would call your backend API
      // For demo purposes, we'll simulate verification
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay

      // Simulate finding a credential (you can modify this logic)
      const mockCredential: Credential = {
        recipientName: "John Doe",
        degree: "Bachelor of Science in Computer Science",
        idHash: idHash,
        issuedAt: Date.now() - 86400000, // 1 day ago
        status: Math.random() > 0.5 ? 0 : 1 // Random status for demo
      }

      // Simulate credential not found for certain hashes
      if (idHash.includes('notfound')) {
        setResult({
          found: false,
          error: 'Credential not found on the blockchain'
        })
      } else {
        setResult({
          found: true,
          credential: mockCredential
        })
      }
    } catch (error) {
      setResult({
        found: false,
        error: 'Verification failed. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusDisplay = (status: number) => {
    if (status === 0) {
      return {
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        text: 'Valid & Issued',
        description: 'This credential is valid and has been issued on the blockchain.'
      }
    } else {
      return {
        icon: XCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        text: 'Revoked',
        description: 'This credential has been revoked and is no longer valid.'
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Verify Credential</h2>
          <p className="mt-1 text-sm text-gray-600">
            Check the validity of a credential using its unique hash
          </p>
        </div>

        <form onSubmit={handleVerify} className="p-6">
          <div>
            <label htmlFor="idHash" className="block text-sm font-medium text-gray-700">
              Credential Hash
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="idHash"
                required
                value={idHash}
                onChange={(e) => setIdHash(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter credential hash (e.g., 0x1234567890abcdef)"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Enter the unique hash of the credential you want to verify
            </p>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading || !idHash.trim()}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Verify Credential
                </>
              )}
            </button>
          </div>
        </form>

        {result && (
          <div className="border-t border-gray-200">
            {result.found && result.credential ? (
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {(() => {
                    const status = getStatusDisplay(result.credential.status)
                    const StatusIcon = status.icon
                    return (
                      <div className={`flex items-center p-3 rounded-md ${status.bgColor} border ${status.borderColor}`}>
                        <StatusIcon className={`h-6 w-6 ${status.color} mr-3`} />
                        <div>
                          <h3 className={`text-sm font-medium ${status.color}`}>
                            {status.text}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {status.description}
                          </p>
                        </div>
                      </div>
                    )
                  })()}
                </div>

                <div className="bg-gray-50 rounded-md p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Credential Details</h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Recipient</dt>
                      <dd className="text-sm text-gray-900">{result.credential.recipientName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Degree/Program</dt>
                      <dd className="text-sm text-gray-900">{result.credential.degree}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Issued Date</dt>
                      <dd className="text-sm text-gray-900">{formatDate(result.credential.issuedAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Credential Hash</dt>
                      <dd className="text-sm text-gray-900 font-mono">{result.credential.idHash}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center p-3 rounded-md bg-red-50 border border-red-200">
                  <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">
                      Credential Not Found
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      {result.error || 'The provided credential hash could not be found on the blockchain.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyCredential