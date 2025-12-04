'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Camera,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  RotateCw,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  User,
  Mail,
  LogOut,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

function FaceVerification() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: null as string | null 
  })
  
  const [verificationStep, setVerificationStep] = useState<'ready' | 'capturing' | 'processing' | 'success' | 'failed'>('ready')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [verificationTips, setVerificationTips] = useState<string[]>([
    "Make sure your face is clearly visible",
    "Look directly at the camera",
    "Ensure good lighting",
    "Remove glasses if possible"
  ])

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
    
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      const imageDataUrl = canvas.toDataURL('image/png')
      setCapturedImage(imageDataUrl)
      
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

    const handleLogout = () => {
    console.log('Logging out...')
    router.push('/login')
    setShowProfileDropdown(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-primary-600 transition-all duration-300" 
          style={{ width: '50%' }}
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
            {getStepTitle()}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getStepDescription()}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <AlertCircle className="w-4 h-4" />
            This helps ensure account security and prevent fraud
          </div>
        </div>

        <div className="flex flex-col items-center mb-12">
          {/* Status Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${
                verificationStep === 'ready' ? 'border-blue-200 bg-blue-50' :
                verificationStep === 'capturing' ? 'border-yellow-200 bg-yellow-50' :
                verificationStep === 'processing' ? 'border-purple-200 bg-purple-50' :
                verificationStep === 'success' ? 'border-green-200 bg-green-50' :
                'border-red-200 bg-red-50'
              }`}>
                {verificationStep === 'ready' && (
                  <Camera className="w-12 h-12 text-blue-600" />
                )}
                {verificationStep === 'capturing' && (
                  <div className="animate-pulse">
                    <Zap className="w-12 h-12 text-yellow-600" />
                  </div>
                )}
                {verificationStep === 'processing' && (
                  <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                )}
                {verificationStep === 'success' && (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                )}
                {verificationStep === 'failed' && (
                  <XCircle className="w-12 h-12 text-red-600" />
                )}
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl mb-8">
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
              {verificationStep === 'ready' || verificationStep === 'capturing' ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-64 h-64 border-2 border-white border-opacity-50 rounded-full"></div>
                      <div className="absolute top-1/2 left-0 w-full h-px bg-white bg-opacity-30 transform -translate-y-1/2"></div>
                      <div className="absolute left-1/2 top-0 w-px h-full bg-white bg-opacity-30 transform -translate-x-1/2"></div>
                    </div>
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
              
              {verificationStep === 'processing' && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                    <p className="text-white font-medium">Analyzing your photo...</p>
                  </div>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="flex justify-center space-x-4">
            {verificationStep === 'ready' && (
              <button
                onClick={capturePhoto}
                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all flex items-center"
              >
                <Camera className="w-5 h-5 mr-2" />
                Capture Photo
              </button>
            )}
            
            {(verificationStep === 'failed' || verificationStep === 'success') && (
              <button
                onClick={retryVerification}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-sm hover:shadow transition-all flex items-center"
              >
                <RotateCw className="w-5 h-5 mr-2" />
                Retry Verification
              </button>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-12 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
            Verification Tips
          </h3>
          <ul className="space-y-2">
            {verificationTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                </div>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-4xl mx-auto pt-8 border-t border-gray-200 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors text-base"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={verificationStep !== 'success'}
              className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center ${
                verificationStep === 'success'
                  ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Complete Setup
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
          <p>Having trouble with face verification? 
            <button className="text-primary-600 hover:text-primary-700 font-medium ml-1">
              Get Help
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default FaceVerification