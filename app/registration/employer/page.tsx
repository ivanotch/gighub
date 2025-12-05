'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { rocaTwo } from "../../fonts";

function Employer() {

  const router = useRouter()

  const handleCreate = () => {
    router.push("/gigbosses");
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="w-full bg-white flex flex-col md:flex-row items-center justify-between px-4 md:px-6 h-auto py-3 gap-2">

        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <Image
            src="/gigdaddy-logo2.png"
            alt="Logo"
            width={170}
            height={170}
            className="object-contain"
          />
        </div>

        {/* Right text */}
        <div className="flex gap-2 md:gap-4 text-sm md:text-base">
          <p>Looking for gig?</p>
          <p className="text-primary-600 cursor-pointer">Apply as GigDaddy</p>
        </div>

      </nav>

      {/* SIGN UP FORM WRAPPER */}
      <div className="mt-6 flex justify-center px-4">
        <div className="flex flex-col w-full sm:w-[90%] md:w-[60%] lg:w-[40%] items-center">

          <div className="space-y-4 w-full">

            {/* Header */}
            <header className={`${rocaTwo.className} text-2xl text-center mb-6`}>
              Sign up to hire a GigDaddy
            </header>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">

              {/* Apple */}
              <div className="flex items-center bg-white gap-3 border border-gray-400 rounded-full px-8 py-2 cursor-pointer hover:bg-gray-50 transition w-full sm:w-auto justify-center">
                <Image src="/apple.png" alt="apple" width={24} height={24} />
                <p className="font-medium">Sign up with Apple</p>
              </div>

              {/* Google */}
              <div className="flex items-center gap-3 border border-gray-400 rounded-full px-8 py-2 cursor-pointer hover:bg-gray-50 transition w-full sm:w-auto justify-center">
                <Image src="/google.png" alt="google" width={24} height={24} />
                <p className="font-medium">Sign up with Google</p>
              </div>

            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* First + Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1">First Name</label>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="font-medium mb-1">Last Name</label>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Working Email</label>
              <input
                type="email"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Password</label>
              <input
                type="password"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Address</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Checkbox 1 */}
            <label className="flex items-start gap-3 mt-2 text-sm">
              <input type="checkbox" className="mt-1 accent-primary-500" />
              <p className="leading-snug text-gray-700">
                Send me emails with tips on how to find talent that fits my needs.
              </p>
            </label>

            {/* Checkbox 2 */}
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1 accent-primary-500" />
              <p className="leading-snug text-gray-700">
                Yes, I understand and agree to the GigDaddy Terms of Service, including the User Agreement and Privacy Policy.
              </p>
            </label>

          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col items-center gap-3 mt-8 w-full">
            <button
              onClick={handleCreate}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Create Account
            </button>

            <p className="text-gray-700 text-sm">
              Already have an account?{" "}
              <span className="text-primary-600 cursor-pointer hover:underline">Log in</span>
            </p>
          </div>

        </div>
      </div>

    </main>
  )
}

export default Employer
