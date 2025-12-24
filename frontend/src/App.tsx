import { useState, useEffect } from 'react'
import { GraduationCap, Plus, Search, CheckCircle, XCircle, Sparkles } from 'lucide-react'
import axios from 'axios'
import IssueCredential from './components/IssueCredential'
import ViewCredentials from './components/ViewCredentials'
import VerifyCredential from './components/VerifyCredential'

interface Credential {
  recipientName: string
  degree: string
  idHash: string
  issuedAt: number
  status: number
}

function App() {
  const [activeTab, setActiveTab] = useState<'issue' | 'view' | 'verify'>('view')
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(false)

  const fetchCredentials = async () => {
    setLoading(true)
    try {
      // For demo purposes, we'll create some sample credentials
      // In a real app, you'd fetch from your backend
      const sampleCredentials: Credential[] = [
        {
          recipientName: "John Doe",
          degree: "Bachelor of Science in Computer Science",
          idHash: "0x1234567890abcdef",
          issuedAt: Date.now() - 86400000, // 1 day ago
          status: 0 // Issued
        },
        {
          recipientName: "Jane Smith",
          degree: "Master of Business Administration",
          idHash: "0xabcdef1234567890",
          issuedAt: Date.now() - 172800000, // 2 days ago
          status: 1 // Revoked
        }
      ]
      setCredentials(sampleCredentials)
    } catch (error) {
      console.error('Error fetching credentials:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCredentials()
  }, [])

  const tabs = [
    { id: 'view' as const, label: 'View Credentials', icon: Search },
    { id: 'issue' as const, label: 'Issue Credential', icon: Plus },
    { id: 'verify' as const, label: 'Verify Credential', icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl animate-pulse opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full blur-3xl animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-400 rounded-full blur-3xl animate-pulse opacity-10" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Header */}
      <header className="relative bg-white bg-opacity-80 backdrop-blur-lg shadow-lg border-b border-gray-200 border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Credential Verifier
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Secure blockchain-based credential verification
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white bg-opacity-50 px-4 py-2 rounded-full border border-gray-200 border-opacity-50">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span>Powered by Ethereum</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative bg-white bg-opacity-60 backdrop-blur-lg shadow-sm border-b border-gray-200 border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-3 py-5 px-6 rounded-t-xl font-semibold text-sm transition-all duration-300 group ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white hover:bg-opacity-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="hidden sm:block">{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white bg-opacity-40 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 border-opacity-20 p-8 transition-all duration-300 hover:shadow-2xl">
            {activeTab === 'view' && (
              <ViewCredentials
                credentials={credentials}
                loading={loading}
                onRefresh={fetchCredentials}
              />
            )}
            {activeTab === 'issue' && (
              <IssueCredential onCredentialIssued={fetchCredentials} />
            )}
            {activeTab === 'verify' && (
              <VerifyCredential />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
