"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Briefcase,
  FileText,
  PhilippinePeso,
  MessageSquare,
  User,
  Settings,
  TrendingUp,
  Calendar,
  Clock,
  BarChart3,
  PieChart,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Target,
  Award,
  Wallet,
  ChevronRight,
  ChevronLeft,
  Shield,
  AlertCircle,
  Package,
  Tag,
  Layers,
  ShoppingCart,
} from "lucide-react";
import Head from "next/head";

function EmployeeAnalytics() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("month");
  const [activeTab, setActiveTab] = useState("overview");
  const [isVerified, setIsVerified] = useState(false);

  const earningsData = {
    currentBalance: "₱2,850.00",
    totalEarned: "₱5,400.00",
    pending: "₱750.00",
    withdrawn: "₱1,800.00",
  };

  const monthlyEarnings = [
    { month: "Jan", earnings: 0 },
    { month: "Feb", earnings: 0 },
    { month: "Mar", earnings: 0 },
    { month: "Apr", earnings: 0 },
    { month: "May", earnings: 0 },
    { month: "Jun", earnings: 0 },
    { month: "Jul", earnings: 0 },
    { month: "Aug", earnings: 0 },
    { month: "Sep", earnings: 0 },
    { month: "Oct", earnings: 1200 },
    { month: "Nov", earnings: 2850 },
    { month: "Dec", earnings: 1350 },
  ];

  const recentTransactions = [
    {
      id: 1,
      job: "Packing Service",
      date: "Dec 5, 2025",
      amount: "₱450",
      status: "completed",
      type: "credit",
      icon: Package,
    },
    {
      id: 2,
      job: "Labeling Service",
      date: "Dec 3, 2025",
      amount: "₱600",
      status: "completed",
      type: "credit",
      icon: Tag,
    },
    {
      id: 3,
      job: "Inventory Management",
      date: "Nov 28, 2025",
      amount: "₱350",
      status: "completed",
      type: "credit",
      icon: Layers,
    },
    {
      id: 4,
      job: "Packing Service",
      date: "Nov 25, 2025",
      amount: "₱400",
      status: "pending",
      type: "credit",
      icon: Package,
    },
    {
      id: 5,
      job: "Packing Service",
      date: "Nov 20, 2025",
      amount: "₱550",
      status: "completed",
      type: "credit",
      icon: Package,
    },
  ];

  const jobCategories = [
    { 
      category: "E-Commerce", 
      earnings: "₱3,600", 
      percentage: 67, 
      jobs: 8,
      icon: ShoppingCart,
      description: "Packing, labeling & inventory"
    },
  ];

  const stats = [
    {
      label: "Avg. Hourly Rate",
      value: "₱220/hr",
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      label: "Jobs Completed",
      value: "12",
      change: "+33%",
      trend: "up",
      icon: CheckCircle,
    },
    {
      label: "Active Jobs",
      value: "1",
      change: "+0%",
      trend: "neutral",
      icon: ClockIcon,
    },
    {
      label: "Client Rating",
      value: "4.7/5",
      change: "+0.2",
      trend: "up",
      icon: Target,
    },
  ];

  // Updated goals for 2025
  const goals = [
    {
      title: "Monthly Target",
      target: "₱8,000",
      current: "₱2,850",
      progress: 36,
      icon: PhilippinePeso,
    },
    {
      title: "E-Commerce Jobs",
      target: "15 jobs",
      current: "8 jobs",
      progress: 53,
      icon: ShoppingCart,
    },
    {
      title: "Repeat Clients",
      target: "5 clients",
      current: "2 clients",
      progress: 40,
      icon: User,
    },
  ];

  const handleWithdraw = () => {
    alert("Withdrawal functionality coming soon!");
  };

  const handleExport = () => {
    alert("Exporting earnings data...");
  };

  const handleBeFullyVerified = () => {
    router.push("/registration/accountVerification");
  };

  const handleRemoveBlur = () => {
    // For testing purposes only - will be removed when backend is connected
    setIsVerified(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-700 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "failed":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getTransactionIcon = (type: string, jobTitle?: string) => {
    // Default icons based on job type
    if (jobTitle?.includes("Packing")) return Package;
    if (jobTitle?.includes("Labeling")) return Tag;
    if (jobTitle?.includes("Inventory")) return Layers;
    return type === "credit" ? PhilippinePeso : Wallet;
  };

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
                <button className="flex items-center px-4 py-3 text-primary-700 bg-primary-50 rounded-lg border border-primary-200 shadow-sm w-full text-left">
                  <PhilippinePeso className="w-5 h-5 mr-3" />
                  <span className="font-semibold">Earnings</span>
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
              <span className="text-white font-semibold text-sm">JU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Jay-ar Untalan
              </p>
              <p className="text-xs text-primary-600 font-medium">
                Balance: {earningsData.currentBalance}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area  */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {!isVerified && (
          <>
            <div className="absolute inset-0 z-40 bg-white/50 backdrop-blur-sm pointer-events-none"></div>

            {/* Warning Modal */}
            <div className="absolute inset-0 z-50 flex items-start justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all border-[2] border-blue-400">
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
                    You need to complete the document verification first to
                    access all dashboard features.
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
                    Note: Full verification is required to access earnings
                    analytics and features.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

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

        {/* Main Analytics Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Earnings Analytics
                </h1>
                <p className="text-gray-600">
                  Track your earnings, set goals, and manage payments
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  You've completed 12 e-commerce jobs so far. Keep it up!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleWithdraw}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
                >
                  <PhilippinePeso className="w-4 h-4" />
                  Withdraw Funds
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      2025 Earnings Overview
                    </h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTimeRange("week")}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          timeRange === "week"
                            ? "bg-primary-100 text-primary-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        Week
                      </button>
                      <button
                        onClick={() => setTimeRange("month")}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          timeRange === "month"
                            ? "bg-primary-100 text-primary-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        Month
                      </button>
                      <button
                        onClick={() => setTimeRange("year")}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          timeRange === "year"
                            ? "bg-primary-100 text-primary-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        Year
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end justify-between h-64">
                      {monthlyEarnings.map((monthData, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center flex-1"
                        >
                          <div className="text-xs text-gray-500 mb-2">
                            {monthData.month}
                          </div>
                          <div className="relative w-8 flex justify-center">
                            <div
                              className={`w-8 rounded-t-lg ${
                                monthData.earnings > 0
                                  ? "bg-primary-500 hover:bg-primary-600"
                                  : "bg-gray-200"
                              }`}
                              style={{
                                height: `${
                                  (monthData.earnings / 3000) * 100
                                }%`,
                              }}
                              title={`₱${monthData.earnings.toLocaleString()}`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-4">
                      Started earning in October 2025
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Current Balance
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {earningsData.currentBalance}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Available to withdraw
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Total Earned</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {earningsData.totalEarned}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Since October 2025
                      </p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Pending</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {earningsData.pending}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        1 packing job pending
                      </p>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Withdrawn</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {earningsData.withdrawn}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        1 withdrawal
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <PieChart className="w-5 h-5" />
                        Earnings by Service Type
                      </h3>
                      <Filter className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="space-y-6">
                      {jobCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {category.category}
                                  </span>
                                  <p className="text-xs text-gray-500">
                                    {category.description}
                                  </p>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-primary-600 h-2 rounded-full"
                                  style={{ width: `${category.percentage}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-2">
                                <span className="text-sm text-gray-600">
                                  {category.jobs} {category.jobs === 1 ? 'job' : 'jobs'}
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {category.earnings}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        2025 Goals & Targets
                      </h3>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>

                    <div className="space-y-6">
                      {goals.map((goal, index) => {
                        const Icon = goal.icon;
                        return (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Icon className="w-5 h-5 text-primary-600" />
                                <span className="font-medium text-gray-900">
                                  {goal.title}
                                </span>
                              </div>
                              <span className={`font-semibold ${
                                goal.progress >= 80 ? 'text-green-600' : 
                                goal.progress >= 50 ? 'text-yellow-600' : 
                                'text-red-600'
                              }`}>
                                {goal.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className={`h-2.5 rounded-full ${
                                  goal.progress >= 80 ? 'bg-green-600' : 
                                  goal.progress >= 50 ? 'bg-yellow-500' : 
                                  'bg-red-500'
                                }`}
                                style={{ width: `${goal.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-2 text-sm text-gray-600">
                              <span>{goal.current}</span>
                              <span>Target: {goal.target}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Stats
                  </h3>

                  <div className="space-y-4">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                              <Icon className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {stat.value}
                              </p>
                              <p className="text-sm text-gray-500">
                                {stat.label}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-1 ${
                              stat.trend === "up"
                                ? "text-green-600"
                                : stat.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                          >
                            {stat.trend === "up" && (
                              <ArrowUp className="w-4 h-4" />
                            )}
                            {stat.trend === "down" && (
                              <ArrowDown className="w-4 h-4" />
                            )}
                            <span className="font-medium">{stat.change}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Recent Transactions
                    </h3>
                    <span className="text-sm text-gray-500">2025</span>
                  </div>

                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => {
                      const Icon = getTransactionIcon(transaction.type, transaction.job);
                      return (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                transaction.status === "completed"
                                  ? "bg-green-100"
                                  : "bg-yellow-100"
                              }`}
                            >
                              <Icon className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {transaction.job}
                              </p>
                              <p className="text-sm text-gray-500">
                                {transaction.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`font-semibold ${
                                transaction.type === "credit"
                                  ? "text-green-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {transaction.type === "credit" ? "+" : "-"}
                              {transaction.amount}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                transaction.status
                              )}`}
                            >
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button className="w-full mt-6 py-3 text-center text-primary-600 hover:text-primary-700 font-medium border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
                    View All Transactions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white border-t shadow-md">
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
              <span className="text-xs mt-1">Browse Jobs</span>
            </button>
            <button
              className="flex flex-col items-center text-sm text-primary-600"
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
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy/profile")}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAnalytics;