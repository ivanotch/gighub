'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Lock,
  Building2,
  IdCard,
  Check,
  X,
  Upload,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  BarChart3,
  FileText,
  HelpCircle,
  User,
  ChevronDown,
  ChevronUp,
  Mail,
  LogOut
} from 'lucide-react'

function AccountVerification() {
  const router = useRouter()
  const [documents, setDocuments] = useState({
    nbi: { file: null as File | null, uploaded: false },
    barangay: { file: null as File | null, uploaded: false },
    nationalId: { file: null as File | null, uploaded: false }
  })
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: null as string | null 
  })

  const documentTypes = [
    {
      id: 'nbi',
      name: "NBI Clearance",
      description: "National Bureau of Investigation clearance",
      icon: Lock,
      requirements: [
        "Clear, legible copy",
        "Recent (within 6 months)",
        "Full page visible",
        "No alterations or edits"
      ],
      format: "PDF, JPG, or PNG",
      maxSize: "5MB"
    },
    {
      id: 'barangay',
      name: "Barangay Clearance",
      description: "Local barangay certificate of residency",
      icon: Building2,
      requirements: [
        "Issued within 3 months",
        "With barangay seal",
        "Complete address",
        "Official signature"
      ],
      format: "PDF, JPG, or PNG",
      maxSize: "5MB"
    },
    {
      id: 'nationalId',
      name: "National ID",
      description: "Philippine Identification System ID",
      icon: IdCard,
      requirements: [
        "Front and back sides",
        "Clear photo and details",
        "Valid expiration date",
        "No glare or blur"
      ],
      format: "PDF, JPG, or PNG",
      maxSize: "5MB"
    }
  ]

  const handleFileUpload = (documentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setDocuments(prev => ({
        ...prev,
        [documentId]: { file, uploaded: true }
      }))
    }
  }

  const handleRemoveFile = (documentId: string) => {
    setDocuments(prev => ({
      ...prev,
      [documentId]: { file: null, uploaded: false }
    }))
  }

  const handleNext = () => {
    const allUploaded = Object.values(documents).every(doc => doc.uploaded)
    if (allUploaded) {
      router.push('/gigdaddy')
    }
  }

  const handleBack = () => {
    router.push('/registration/accountVerification/faceVerification')
  }

  const handleSkip = () => {
    router.push('/gigdaddy')
  }

    const handleLogout = () => {
    console.log('Logging out...')
    router.push('/login')
    setShowProfileDropdown(false)
  }

  const getUploadedFileName = (documentId: string) => {
    const doc = documents[documentId as keyof typeof documents]
    return doc.file ? doc.file.name : null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-primary-600 transition-all duration-300" 
          style={{ width: '100%' }}
        />
      </div>

      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow p-2 pr-4"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
              {userData.avatarUrl ? (
                <img 
                  src={userData.avatarUrl} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <span className="font-medium text-gray-700 truncate max-w-[120px]">
              {userData.name.split(' ')[0]}
            </span>
            {showProfileDropdown ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0"
                onClick={() => setShowProfileDropdown(false)}
              />
              
              {/* Dropdown Content */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
                      {userData.avatarUrl ? (
                        <img 
                          src={userData.avatarUrl} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-7 h-7 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{userData.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="w-4 h-4 mr-1" />
                        <span className="truncate">{userData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Verify Your Account
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit required documents to complete your profile and start accepting gigs.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4" />
            Your documents are securely stored and encrypted
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {documentTypes.map((doc) => {
            const isUploaded = documents[doc.id as keyof typeof documents].uploaded
            const fileName = getUploadedFileName(doc.id)
            
            return (
              <div
                key={doc.id}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-200 min-h-[400px] flex flex-col
                  ${isUploaded 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isUploaded ? 'border-green-500 bg-green-500' : 'border-gray-300'
                }`}>
                  {isUploaded && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                  isUploaded ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <doc.icon className={`w-8 h-8 ${
                    isUploaded ? 'text-green-600' : 'text-blue-600'
                  }`} />
                </div>

                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isUploaded ? 'text-green-800' : 'text-gray-900'
                  }`}>
                    {doc.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    isUploaded ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {doc.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {doc.requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <span>Format: {doc.format}</span>
                      <span>•</span>
                      <span>Max size: {doc.maxSize}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  {isUploaded ? (
                    <div className="bg-white border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                              {fileName}
                            </p>
                            <p className="text-xs text-green-600">Uploaded successfully</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(doc.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove file"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="block">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm font-medium text-gray-700">Upload Document</span>
                          <span className="text-xs text-gray-500 mt-1">Click to browse files</span>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileUpload(doc.id, e)}
                        />
                      </div>
                    </label>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Verification Progress</h3>
                <p className="text-sm text-gray-600">
                  {Object.values(documents).filter(doc => doc.uploaded).length} of {documentTypes.length} documents uploaded
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(Object.values(documents).filter(doc => doc.uploaded).length / documentTypes.length) * 100}%` 
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-2">Important Notes:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  All documents must be clear, legible, and valid
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  Verification typically takes 24-48 hours
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  You can start browsing gigs while verification is in progress
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors text-base"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleSkip}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Skip for now
              </button>
              
              <button
                onClick={handleNext}
                disabled={!Object.values(documents).every(doc => doc.uploaded)}
                className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center ${
                  Object.values(documents).every(doc => doc.uploaded)
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit for Verification
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountVerification