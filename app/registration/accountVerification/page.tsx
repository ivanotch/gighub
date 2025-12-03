'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function AccountVerification() {
  const router = useRouter()
  const [documents, setDocuments] = useState({
    nbi: { file: null as File | null, uploaded: false },
    barangay: { file: null as File | null, uploaded: false },
    nationalId: { file: null as File | null, uploaded: false }
  })

  // Document types with their requirements
  const documentTypes = [
    {
      id: 'nbi',
      name: "NBI Clearance",
      description: "National Bureau of Investigation clearance",
      icon: "🔒",
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
      icon: "🏛️",
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
      icon: "🆔",
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
      router.push('/dashboard')
    }
  }

  const handleBack = () => {
    router.push('/registration/accountVerification/faceVerification')
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const getUploadedFileName = (documentId: string) => {
    const doc = documents[documentId as keyof typeof documents]
    return doc.file ? doc.file.name : null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-primary-600 transition-all duration-300" 
          style={{ width: '100%' }}
        />
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
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Your documents are securely stored and encrypted
          </div>
        </div>

        {/* Document Upload Cards in ROW layout */}
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
                {/* Upload Status Indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isUploaded ? 'border-green-500 bg-green-500' : 'border-gray-300'
                }`}>
                  {isUploaded && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Document Icon */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                  isUploaded ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <span className="text-3xl">{doc.icon}</span>
                </div>

                {/* Document Info */}
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

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {doc.requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* File Format Info */}
                  <div className="text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <span>Format: {doc.format}</span>
                      <span>•</span>
                      <span>Max size: {doc.maxSize}</span>
                    </div>
                  </div>
                </div>

                {/* Upload Area */}
                <div className="mt-4">
                  {isUploaded ? (
                    <div className="bg-white border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
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
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="block">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                        <div className="flex flex-col items-center">
                          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
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

        {/* Upload Status Summary */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Verification Progress</h3>
                <p className="text-sm text-gray-600">
                  {Object.values(documents).filter(doc => doc.uploaded).length} of {documentTypes.length} documents uploaded
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
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

            {/* Requirements Note */}
            <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-2">Important Notes:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  All documents must be clear, legible, and valid
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Verification typically takes 24-48 hours
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  You can start browsing gigs while verification is in progress
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Left: Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors text-base"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {/* Right: Skip and Next Buttons */}
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
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  Object.values(documents).every(doc => doc.uploaded)
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit for Verification
                <svg 
                  className="w-5 h-5 ml-2 inline-block" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Help Text */}
        <div className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
          <p>Need help with document requirements? <button className="text-primary-600 hover:text-primary-700 font-medium">Contact Support</button></p>
        </div>
      </div>

      {/* Logo at bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex items-center text-gray-400 text-sm">
          <Image 
            src="/gigdaddy-logo.png" 
            alt="GigDaddy" 
            width={120} 
            height={40}
            className="opacity-60"
          />
        </div>
      </div>
    </div>
  )
}

export default AccountVerification