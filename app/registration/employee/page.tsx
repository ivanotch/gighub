'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function Employee() {

  const router = useRouter()

  const handleCreate = () => {
    router.push('/registration/categorySelection')
  }

  return (
    <main>
      <nav className="w-full bg-white flex items-center h-[4rem] justify-between px-6 py-3">
        <div className="flex shrink-0 items-center">
          <Image
            src="/gigdaddy-logo.png"
            alt="Logo"
            width={170}
            height={170}
            className="object-contain"
          />
        </div>
        <div className='flex gap-4'>
          <p>Here to find a worker?</p>
          <p className='text-blue-600'>Join as a Client</p>
        </div>
      </nav>


      <div>
        <div className='flex flex-col w-[37%] mx-[auto] mt-[1rem] items-center'>

          <div className="space-y-4">
            <header className='text-[2rem] text-center mb-[2rem]'>Sign up to find gig you love</header>
            <div className="flex justify-center gap-4 w-full">

              {/* Apple Button */}
              <div className="flex items-center bg-white gap-3 border border-gray-400 rounded-full px-11 py-2 cursor-pointer hover:bg-gray-50 transition">
                <Image
                  src="/apple.png"
                  alt="apple logo"
                  width={24}
                  height={24}
                  className="rounded"
                />
                <p className="text-gray-800 font-medium">Sign up with Apple</p>
              </div>

              {/* Google Button */}
              <div className="flex items-center gap-3 border border-gray-400 rounded-full px-11 py-2 cursor-pointer hover:bg-gray-50 transition">
                <Image
                  src="/google.png"
                  alt="google logo"
                  width={24}
                  height={24}
                  className="rounded"
                />
                <p className="text-gray-800 font-medium">Sign up with Google</p>
              </div>


            </div>
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            {/* First + Last Name Side by Side */}
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <label className="text-gray-700 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Working Email */}
            <div className="flex flex-col w-full">
              <label className="text-gray-700 font-medium mb-1">Working Email</label>
              <input
                type="email"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-full">
              <label className="text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col w-full">
              <label className="text-gray-700 font-medium mb-1">Address</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Checkbox 1 */}
            <div className="my-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative w-5 h-5 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="
                      peer w-5 h-5 appearance-none 
                      border border-gray-400 rounded-sm 
                      checked:bg-blue-600 checked:border-blue-600
                      cursor-pointer transition
                    "
                  />
                  <span
                    className="
                      absolute inset-0 flex items-center justify-center 
                      text-white text-sm font-bold
                      pointer-events-none
                      scale-0 peer-checked:scale-100 
                      transition-transform
                    "
                  >
                    ✓
                  </span>
                </div>

                <p className="text-[0.9rem] leading-snug flex-1">
                  Send me emails with tips on how to find talent that fits my needs.
                </p>
              </label>
            </div>

            {/* Checkbox 2 */}
            <div className="my-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative w-5 h-5 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="
                      peer w-5 h-5 appearance-none 
                      border border-gray-400 rounded-sm 
                      checked:bg-blue-600 checked:border-blue-600
                      cursor-pointer transition
                    "
                  />
                  <span
                    className="
                      absolute inset-0 flex items-center justify-center 
                      text-white text-sm font-bold
                      pointer-events-none
                      scale-0 peer-checked:scale-100 
                      transition-transform
                    "
                  >
                    ✓
                  </span>
                </div>

                <p className="text-[0.9rem] leading-snug flex-1">
                  Yes, I understand and agree to the GigDaddy Terms of Service, including the User Agreement and Privacy Policy.
                </p>
              </label>
            </div>

          </div>

          <div className="flex flex-col items-center gap-3 mt-6">

            {/* Create Account Button */}
            <button
              onClick={handleCreate}
              className="w-full max-w-xs bg-primary-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Create Account
            </button>

            {/* Login Text */}
            <p className="text-gray-700 text-sm">
              Already have an account?{" "}
              <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>

    </main>
  )
}

export default Employee