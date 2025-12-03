'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function FaceVerification() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [verificationStep, setVerificationStep] = useState<'ready' | 'capturing' | 'processing' | 'success' | 'failed'>('ready')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [verificationTips, setVerificationTips] = useState<string[]>([
    "Make sure your face is clearly visible",
    "Look directly at the camera",
    "Ensure good lighting",
    "Remove glasses if possible"
  ])

  // Start camera when component mounts
  useEffect(() => {
    if (verificationStep === 'ready') {
      startCamera()
    }
    
    return () => {
      stopCamera()
    }
  }, [verificationStep])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setVerificationTips(prev => [
        "Camera access denied. Please allow camera access to continue.",
        "Check your browser permissions",
        "Try using a different browser",
        "Make sure no other app is using the camera"
      ])
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      setVerificationStep('capturing')
      
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Draw video frame to canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Get image data URL
      const imageDataUrl = canvas.toDataURL('image/png')
      setCapturedImage(imageDataUrl)
      
      // Stop camera
      stopCamera()
      
      // Simulate processing
      setVerificationStep('processing')
      setTimeout(() => {
        // For demo, 80% chance of success
        const isSuccess = Math.random() > 0.2
        setVerificationStep(isSuccess ? 'success' : 'failed')
        
        if (isSuccess) {
          setVerificationTips([
            "Face verification successful!",
            "Your identity has been confirmed",
            "You can now access all features",
            "Verification completed successfully"
          ])
        } else {
          setVerificationTips([
            "Face verification failed",
            "Please ensure your face is clearly visible",
            "Try again with better lighting",
            "Make sure you're looking directly at the camera"
          ])
        }
      }, 2000)
    }
  }

  const retryVerification = () => {
    setCapturedImage(null)
    setVerificationStep('ready')
    setVerificationTips([
      "Make sure your face is clearly visible",
      "Look directly at the camera",
      "Ensure good lighting",
      "Remove glasses if possible"
    ])
    setTimeout(() => startCamera(), 100)
  }

  const handleNext = () => {
    if (verificationStep === 'success') {
      router.push('/registration/accountVerification')
    }
  }

  const handleBack = () => {
    router.push('/registration/categorySelection')
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const getStepTitle = () => {
    switch (verificationStep) {
      case 'ready': return 'Face Verification'
      case 'capturing': return 'Capturing Photo...'
      case 'processing': return 'Processing Image...'
      case 'success': return 'Verification Successful!'
      case 'failed': return 'Verification Failed'
      default: return 'Face Verification'
    }
  }

  const getStepDescription = () => {
    switch (verificationStep) {
      case 'ready': return 'Take a clear photo of your face for identity verification'
      case 'capturing': return 'Please stay still while we capture your photo'
      case 'processing': return 'Analyzing your photo for verification'
      case 'success': return 'Your identity has been successfully verified'
      case 'failed': return 'We couldn\'t verify your identity. Please try again'
      default: return 'Take a clear photo of your face for identity verification'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-primary-600 transition-all duration-300" 
          style={{ width: '50%' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getStepTitle()}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getStepDescription()}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            This helps ensure account security and prevent fraud
          </div>
        </div>

        {/* Main Content Area - Camera/Photo Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Camera/Photo */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
              {/* Status Indicator */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${
                    verificationStep === 'ready' ? 'border-blue-200 bg-blue-50' :
                    verificationStep === 'capturing' ? 'border-yellow-200 bg-yellow-50' :
                    verificationStep === 'processing' ? 'border-purple-200 bg-purple-50' :
                    verificationStep === 'success' ? 'border-green-200 bg-green-50' :
                    'border-red-200 bg-red-50'
                  }`}>
                    {verificationStep === 'ready' && (
                      <span className="text-4xl">📷</span>
                    )}
                    {verificationStep === 'capturing' && (
                      <div className="animate-pulse">
                        <span className="text-4xl">⚡</span>
                      </div>
                    )}
                    {verificationStep === 'processing' && (
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    )}
                    {verificationStep === 'success' && (
                      <span className="text-4xl">✅</span>
                    )}
                    {verificationStep === 'failed' && (
                      <span className="text-4xl">❌</span>
                    )}
                  </div>
                  
                  {/* Progress circle for processing */}
                  {verificationStep === 'processing' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-600">Processing...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Camera Feed or Captured Photo */}
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6">
                {verificationStep === 'ready' || verificationStep === 'capturing' ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {/* Camera overlay guides */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-white border-opacity-50 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
                      Position your face within the circle
                    </div>
                  </>
                ) : capturedImage ? (
                  <img
                    src={capturedImage}
                    alt="Captured face"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <span className="text-gray-400">No image captured</span>
                  </div>
                )}
                
                {/* Loading overlay for processing */}
                {verificationStep === 'processing' && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="text-white font-medium">Analyzing your photo...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Hidden canvas for capturing */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                {verificationStep === 'ready' && (
                  <button
                    onClick={capturePhoto}
                    className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Capture Photo
                    </span>
                  </button>
                )}
                
                {(verificationStep === 'failed' || verificationStep === 'success') && (
                  <button
                    onClick={retryVerification}
                    className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Retry Verification
                    </span>
                  </button>
                )}
              </div>
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
                onClick={handleNext}
                disabled={verificationStep !== 'success'}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  verificationStep === 'success'
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Complete Setup
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
          <p>Having trouble with face verification? <button className="text-primary-600 hover:text-primary-700 font-medium">Get Help</button></p>
        </div>
      </div>
    </div>
  )
}

export default FaceVerification