"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Head from "next/head";
import { Home, Briefcase, PhilippinePeso, MessageSquare, User, Settings, Shield, AlertCircle, CheckCircle } from "lucide-react";

function EmployeeDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [salaryRange, setSalaryRange] = useState("All");
  const [isVerified, setIsVerified] = useState(false); // State to control blur/verification

  const user = {
    name: "Jay-ar Untalan",
    balance: "₱2,500.00",
  };

  const handleBeFullyVerified = () => {
    router.push("/registration/accountVerification");
  };

  const handleRemoveBlur = () => {
    // For testing purposes only - will be removed when backend is connected
    setIsVerified(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>

      {/* Left Navigation - NOT blurred */}
      <div className="w-64 bg-linear-to-b from-primary-50 to-white shadow-xl border-r border-gray-200 flex-col sticky top-0 h-screen hidden md:flex">
        <div className="p-6 border-b border-primary-100 bg-white">
          <div className="flex items-center space-x-3">
            <div>
              <img
                src="/gigdaddy-logo2.png"
                alt="Gigdaddy Logo"
                className="w-64 h-16"
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
              Main Menu
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/dashboard")}
                  className="flex items-center px-4 py-3 text-primary-700 bg-primary-50 rounded-lg border border-primary-200 shadow-sm w-full text-left"
                >
                  <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/myjobs")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <Briefcase className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Browse Jobs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/analytics")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <PhilippinePeso className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Earnings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/message")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <MessageSquare className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Message</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
              Account
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/profile")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <User className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/settings")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <Settings className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-primary-100 bg-white">
          <div className="flex items-center space-x-3 p-3 bg-linear-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-100">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-sm">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-primary-600 font-medium">
                Balance: {user.balance}
              </p>
            </div>
            {isVerified && (
              <div className="text-green-600" title="Verified">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area with conditional blur overlay */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Warning Modal Overlay - Only shows when not verified */}
        {!isVerified && (
          <>
            {/* Blur Overlay - Only on main content */}
            <div className="absolute inset-0 z-40 bg-white/50 backdrop-blur-sm pointer-events-none"></div>
            
            {/* Warning Modal */}
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
                {/* Warning Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-yellow-600" />
                  </div>
                </div>

                {/* Warning Text */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Verification Required
                  </h2>
                  <p className="text-gray-600">
                    You need to complete the document verification first to access all dashboard features.
                  </p>
                </div>

                {/* Stats/Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">0%</div>
                      <div className="text-xs text-gray-600">Verified</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">4</div>
                      <div className="text-xs text-gray-600">Docs Pending</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBeFullyVerified}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    Be Fully Verified
                  </button>
                  
                  <button
                    onClick={handleRemoveBlur}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-300 text-sm"
                  >
                    Test Mode: Remove Blur (Development Only)
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Note: Full verification is required to apply for jobs and access all features.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile Header - NOT blurred */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
          <div className="flex items-center gap-2">
            <img
              src="/gigdaddy-logo2.png"
              alt="Gigdaddy Logo"
              className="h-10 w-auto"
            />
          </div>
          <button className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-semibold text-sm">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </button>
        </div>

        {/* Main Dashboard Content - Inside the blur area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Verification Status Banner */}
            {isVerified && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-green-900">Account Fully Verified</h3>
                    <p className="text-green-700 text-sm">You have access to all features</p>
                  </div>
                </div>
                <div className="text-green-800 font-semibold">100% Complete</div>
              </div>
            )}

            {/* Empty Dashboard Content */}
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Home className="w-12 h-12 text-primary-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Welcome to Your Dashboard
              </h1>
              <p className="text-gray-600 max-w-md mb-8">
                This is your main dashboard area. Under Development.
              </p>
              <button
                onClick={() => router.push("/gigdaddy/myjobs")}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Browse Jobs
              </button>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white border-t shadow-md">
          <div className="flex justify-around py-3 text-gray-600">
            <button
              className="flex flex-col items-center text-sm text-primary-600"
              onClick={() => router.push("/gigdaddy/dashboard")}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy/myjobs")}
            >
              <Briefcase className="w-6 h-6" />
              <span className="text-xs mt-1">Browse Jobs</span>
            </button>
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy/profile")}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy/analytics")}
            >
              <PhilippinePeso className="w-6 h-6" />
              <span className="text-xs mt-1">Earnings</span>
            </button>
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy/message")}
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs mt-1">Messages</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;