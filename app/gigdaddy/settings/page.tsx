"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Home,
  Briefcase,
  PhilippinePeso,
  MessageSquare,
  User,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Mail,
  Lock,
  Calendar,
  MapPin,
  AlertCircle,
  Save,
  Trash2,
  Download,
  Upload,
  HelpCircle,
  LogOut,
  ChevronRight,
  Check,
  X,
  Plus
} from "lucide-react";
import Head from "next/head";

function EmployeeSettings() {
  const router = useRouter();
  
  // Profile Settings
  const [profileData, setProfileData] = useState({
    firstName: "Jay-ar",
    lastName: "Untalan",
    email: "jayar.untalan@example.com",
    phone: "+63 912 345 6789",
    address: "123 Main Street, Manila, Philippines",
    bio: "Professional cleaner with 5+ years of experience. Specialized in residential and commercial cleaning services.",
    birthDate: "1990-05-15",
    gender: "male"
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    messageAlerts: true,
    paymentAlerts: true,
    marketingEmails: false,
    newsletter: false
  });

  // Privacy & Security
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    showProfile: true,
    allowMessages: true,
    locationSharing: "partial",
    dataSharing: false
  });

  // Payment Settings
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "bank", name: "BDO Savings", lastFour: "1234", primary: true },
    { id: 2, type: "gcash", name: "GCash", lastFour: "5678", primary: false }
  ]);

  // Preferences
  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "Asia/Manila",
    autoAcceptJobs: false,
    minHourlyRate: 250
  });

  const handleSaveProfile = () => {
    console.log("Saving profile...", profileData);
    // Add API call here
    alert("Profile updated successfully!");
  };

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleToggleSecurity = (key: keyof typeof security) => {
    setSecurity(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      router.push("/login");
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = confirm("This action cannot be undone. All your data will be permanently deleted. Are you sure?");
    if (confirmed) {
      // Add account deletion logic here
      alert("Account deletion request submitted.");
    }
  };

  const handleExportData = () => {
    alert("Data export functionality coming soon!");
  };

  const handleAddPaymentMethod = () => {
    alert("Add payment method functionality coming soon!");
  };

  const SettingSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );

  const ToggleSwitch = ({ checked, onChange, label, description }: { 
    checked: boolean, 
    onChange: () => void, 
    label: string,
    description?: string 
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-primary-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const InputField = ({ label, value, onChange, type = "text", placeholder }: { 
    label: string, 
    value: string, 
    onChange: (value: string) => void, 
    type?: string,
    placeholder?: string 
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>

      {/* Left Navigation */}
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
                  onClick={() => router.push("/gigdaddy")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Dashboard</span>
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
                <button className="flex items-center px-4 py-3 text-primary-700 bg-primary-50 rounded-lg border border-primary-200 shadow-sm w-full text-left">
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-semibold">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-primary-100 bg-white">
          <div className="flex items-center space-x-3 p-3 bg-linear-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-100">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-sm">JU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Jay-ar Untalan
              </p>
              <p className="text-xs text-primary-600 font-medium">
                Account Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
          <div className="flex items-center gap-2">
            <img
              src="/gigdaddy-logo2.png"
              alt="Gigdaddy Logo"
              className="h-10 w-auto"
            />
          </div>
          <button className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-semibold text-sm">JU</span>
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600">Manage your account preferences and security settings</p>
            </div>

            {/* Notification Settings */}
            <SettingSection title="Notifications" icon={Bell}>
              <div className="divide-y divide-gray-100">
                <ToggleSwitch 
                  checked={notifications.pushNotifications}
                  onChange={() => handleToggleNotification("pushNotifications")}
                  label="Push Notifications"
                  description="Get notifications on your device"
                />
                <ToggleSwitch 
                  checked={notifications.jobAlerts}
                  onChange={() => handleToggleNotification("jobAlerts")}
                  label="Job Alerts"
                  description="New job opportunities in your area"
                />
                <ToggleSwitch 
                  checked={notifications.messageAlerts}
                  onChange={() => handleToggleNotification("messageAlerts")}
                  label="Message Alerts"
                  description="When clients message you"
                />
                <ToggleSwitch 
                  checked={notifications.paymentAlerts}
                  onChange={() => handleToggleNotification("paymentAlerts")}
                  label="Payment Alerts"
                  description="Payment updates and confirmations"
                />
              </div>
            </SettingSection>

            {/* Privacy & Security */}
            <SettingSection title="Privacy & Security" icon={Shield}>
              <div className="divide-y divide-gray-100">
                <ToggleSwitch 
                  checked={security.twoFactorAuth}
                  onChange={() => handleToggleSecurity("twoFactorAuth")}
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                />
                <div className="py-4 border-b border-gray-100">
                  <p className="font-medium text-gray-900 mb-2">Location Sharing</p>
                  <div className="flex gap-4">
                    {["none", "partial", "full"].map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="locationSharing"
                          value={option}
                          checked={security.locationSharing === option}
                          onChange={(e) => setSecurity({...security, locationSharing: e.target.value})}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Controls how much location data is shared with clients
                  </p>
                </div>
                <div className="py-4">
                  <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Change Password
                  </button>
                </div>
              </div>
            </SettingSection>

            {/* Preferences */}
            <SettingSection title="Preferences" icon={Globe}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select 
                    value={preferences.language}
                    onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="fil">Filipino</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select 
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Asia/Manila">Manila (UTC+8)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                    <option value="Europe/London">London (UTC+0)</option>
                  </select>
                </div>
              </div>
            </SettingSection>

            {/* Account Actions */}
            <SettingSection title="Account Actions" icon={AlertCircle}>
              <div className="space-y-4">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Need help? <a href="#" className="text-primary-600 hover:underline">Contact Support</a>
                </p>
              </div>
            </SettingSection>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md">
          <div className="flex justify-around py-3 text-gray-600">
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy")}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy/myjobs")}
            >
              <Briefcase className="w-6 h-6" />
              <span className="text-xs mt-1">Jobs</span>
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
              <span className="text-xs mt-1">Chat</span>
            </button>
            <button
              className="flex flex-col items-center text-sm text-primary-600"
              onClick={() => router.push("/gigdaddy/settings")}
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSettings;