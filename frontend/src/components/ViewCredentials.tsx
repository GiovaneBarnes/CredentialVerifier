import { RefreshCw, CheckCircle, XCircle, Calendar, Hash } from 'lucide-react'

interface Credential {
  recipientName: string
  degree: string
  idHash: string
  issuedAt: number
  status: number
}

interface ViewCredentialsProps {
  credentials: Credential[]
  loading: boolean
  onRefresh: () => void
}

function ViewCredentials({ credentials, loading, onRefresh }: ViewCredentialsProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: number) => {
    if (status === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Issued
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Revoked
        </span>
      )
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Credentials</h2>
          <p className="mt-1 text-sm text-gray-600">
            View all issued and revoked credentials on the blockchain
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading credentials...</span>
        </div>
      ) : credentials.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Hash className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No credentials</h3>
          <p className="mt-1 text-sm text-gray-500">
            No credentials have been issued yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {credentials.map((credential) => (
            <div
              key={credential.idHash}
              className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {credential.recipientName}
                  </h3>
                  {getStatusBadge(credential.status)}
                </div>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {credential.degree}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Issued: {formatDate(credential.issuedAt)}
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Hash className="h-4 w-4 mr-2" />
                    <span className="font-mono text-xs">
                      {credential.idHash.substring(0, 10)}...
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewCredentials