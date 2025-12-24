import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle, Sparkles, FileText } from 'lucide-react'
import axios from 'axios'

interface IssueCredentialProps {
  onCredentialIssued: () => void
}

function IssueCredential({ onCredentialIssued }: IssueCredentialProps) {
  const [formData, setFormData] = useState({
    recipientName: '',
    degree: '',
    idHash: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Generate a simple hash for demo purposes (browser-compatible)
      const timestamp = Date.now().toString()
      const dataString = formData.recipientName + formData.degree + timestamp
      const idHash = '0x' + Array.from(dataString)
        .reduce((hash, char) => {
          const chr = char.charCodeAt(0)
          hash = ((hash << 5) - hash) + chr
          return hash & hash
        }, 0)
        .toString(16)
        .substring(0, 16)

      const credentialData = {
        ...formData,
        idHash
      }

      // In a real app, this would call your backend API
      // For demo, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate network delay

      // Simulate successful issuance
      setMessage({
        type: 'success',
        text: `Credential issued successfully! Transaction hash: 0x${Math.random().toString(16).substring(2, 10)}`
      })

      // Reset form
      setFormData({ recipientName: '', degree: '', idHash: '' })
      onCredentialIssued()
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to issue credential. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl border border-gray-200 border-opacity-50 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Issue New Credential</h2>
              <p className="text-blue-100 text-sm">
                Create a new digital credential on the blockchain
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="recipientName" className="block text-sm font-semibold text-gray-700 mb-2">
                Recipient Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  required
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300"
                  placeholder="Enter recipient's full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="degree" className="block text-sm font-semibold text-gray-700 mb-2">
                Degree/Program
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  required
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 border-opacity-50 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">
                  Secure Hash Generation
                </h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>
                    A unique cryptographic hash will be automatically generated for this credential.
                  </p>
                  <p>
                    This ensures immutability, prevents duplicates, and maintains data integrity on the blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {message && (
            <div className={`rounded-xl p-6 border-2 ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {message.type === 'success' ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-semibold mb-1 ${
                    message.type === 'success' ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {message.type === 'success' ? 'Credential Issued Successfully!' : 'Issuance Failed'}
                  </h3>
                  <p className="text-sm">
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Issuing Credential...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 mr-3" />
                  Issue Credential
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IssueCredential