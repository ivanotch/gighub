"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "../../../components/landingpage/Button";
import Input from "../../../components/landingpage/Input";
import Card from "../../../components/landingpage/Card";
import ConfirmationModal from "../../../components/landingpage/ConfirmationModal";
import SavedJobCard from "./components/SavedJobCard";
import ActiveJobCard from "./components/ActiveJobCard";
import CompletedJobCard from "./components/CompletedJobCard";
import CanceledJobCard from "./components/CanceledJobCard";

// Define specific TypeScript interfaces for each job type
interface BaseJob {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  salary: string;
  category: string;
}

interface SavedJob extends BaseJob {
  postedDate: string;
  savedDate: string;
}

interface ActiveJob extends BaseJob {
  status: string;
  startDate: string;
  employer: string;
  progress: number;
}

interface CompletedJob extends BaseJob {
  status: string;
  completionDate: string;
  employer: string;
  rating: number;
  earnings: string;
}

interface CanceledJob extends BaseJob {
  status: string;
  cancelDate: string;
  employer: string;
  reason: string;
}

type Job = SavedJob | ActiveJob | CompletedJob | CanceledJob;

// Updated jobs data with proper typing
const jobsData = {
  saved: [
    {
      id: 1,
      imageUrl: "/images/Lawnmower.png",
      title: "Lawn Care",
      subtitle: "Part-time/Flexible",
      description: "Taga tanggal ng damo sa bahay namin.",
      location: "Mandaluyong City",
      salary: "₱500/day",
      category: "Gardening",
      postedDate: "2024-01-15",
      savedDate: "2024-01-16",
    },
    {
      id: 2,
      imageUrl: "/images/Barista.png",
      title: "Barista",
      subtitle: "Full-time Position",
      description:
        "Taga shake ng kape at iba pang inumin sa aming cafe. Training provided.",
      location: "Mandaluyong City",
      salary: "₱15,000/month",
      category: "Food & Beverage",
      postedDate: "2024-01-10",
      savedDate: "2024-01-14",
    },
  ] as SavedJob[],
  active: [
    {
      id: 3,
      imageUrl: "/images/Construction.png",
      title: "Construction Laborer",
      subtitle: "Full-time Position",
      description: "Pagod na ako foreman.",
      location: "Mandaluyong City",
      salary: "₱600/day",
      category: "Construction",
      status: "In Progress",
      startDate: "2024-01-20",
      employer: "BuildRight Construction",
      progress: 65,
    },
    {
      id: 4,
      imageUrl: "/images/Housework.png",
      title: "House Chores Specialist",
      subtitle: "Experienced Required",
      description: "LF taga linis ng bahay namin.",
      location: "Mandaluyong City",
      salary: "₱450/day",
      category: "Household",
      status: "Starting Soon",
      startDate: "2024-01-25",
      employer: "Maria Santos",
      progress: 0,
    },
  ] as ActiveJob[],
  completed: [
    {
      id: 5,
      imageUrl: "/images/Laundryclerk.png",
      title: "Laundry Clerk",
      subtitle: "Full-time Position",
      description:
        "Responsible for washing, drying, and folding clothes. Attention to detail required.",
      location: "Mandaluyong City",
      salary: "₱12,000/month",
      category: "Household",
      status: "Completed",
      completionDate: "2024-01-18",
      employer: "CleanWash Laundry",
      rating: 5,
      earnings: "₱12,000",
    },
    {
      id: 6,
      imageUrl: "/images/Pastry.png",
      title: "Bakery Worker",
      subtitle: "Full-time Position",
      description:
        "Assist in baking and decorating pastries. Previous bakery experience is a plus.",
      location: "Mandaluyong City",
      salary: "₱13,000/month",
      category: "Food & Beverage",
      status: "Completed",
      completionDate: "2024-01-12",
      employer: "SweetBakes Cafe",
      rating: 4,
      earnings: "₱13,000",
    },
  ] as CompletedJob[],
  canceled: [
    {
      id: 7,
      imageUrl: "/images/Shopclerk.png",
      title: "Shop Clerk",
      subtitle: "Full-time Position",
      description:
        "Manage sales and customer service in a retail environment. Good communication skills needed.",
      location: "Mandaluyong City",
      salary: "₱14,000/month",
      category: "Retail",
      status: "Canceled",
      cancelDate: "2024-01-16",
      employer: "RetailPlus Store",
      reason: "Schedule conflict",
    },
  ] as CanceledJob[],
};

function MyJobsPage() {
  const router = useRouter();

  // Mock user data
  const user = {
    name: "Juan Dela Cruz",
    balance: "₱2,500.00",
  };

  // State management
  const [activeTab, setActiveTab] = useState<
    "saved" | "active" | "completed" | "canceled"
  >("saved");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Get unique categories for filter
  const allJobs = [
    ...jobsData.saved,
    ...jobsData.active,
    ...jobsData.completed,
    ...jobsData.canceled,
  ];
  const categories = ["All", ...new Set(allJobs.map((job) => job.category))];

  // Get current jobs based on active tab with proper typing
  const currentJobs = jobsData[activeTab];

  // Filter jobs based on search and filters
  const filteredJobs = currentJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ('employer' in job && job.employer.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle job actions with proper typing
  const handleRemoveSaved = (job: SavedJob) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    console.log("Removing job:", selectedJob);
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleApplyJob = (job: SavedJob) => {
    console.log("Applying for job:", job);
    // Add application logic here
  };

  const handleViewDetails = (job: Job) => {
    console.log("Viewing details for job:", job);
    // Add view details logic here
  };

  const handleHelpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Help clicked");
  };

  const handleBrowseJobsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/gigdaddy");
  };

  // Type guard functions
  const isSavedJob = (job: Job): job is SavedJob => {
    return 'savedDate' in job;
  };

  const isActiveJob = (job: Job): job is ActiveJob => {
    return 'progress' in job;
  };

  const isCompletedJob = (job: Job): job is CompletedJob => {
    return 'rating' in job;
  };

  const isCanceledJob = (job: Job): job is CanceledJob => {
    return 'reason' in job;
  };

  // Render appropriate card based on active tab
  const renderJobCard = (job: Job) => {
    switch (activeTab) {
      case "saved":
        if (isSavedJob(job)) {
          return (
            <SavedJobCard
              key={job.id}
              job={job}
              onApply={handleApplyJob}
              onRemove={handleRemoveSaved}
              onViewDetails={handleViewDetails}
            />
          );
        }
        return null;
      case "active":
        if (isActiveJob(job)) {
          return (
            <ActiveJobCard
              key={job.id}
              job={job}
              onViewDetails={handleViewDetails}
            />
          );
        }
        return null;
      case "completed":
        if (isCompletedJob(job)) {
          return (
            <CompletedJobCard
              key={job.id}
              job={job}
              onViewDetails={handleViewDetails}
            />
          );
        }
        return null;
      case "canceled":
        if (isCanceledJob(job)) {
          return (
            <CanceledJobCard
              key={job.id}
              job={job}
              onViewDetails={handleViewDetails}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side Navigation - Same as EmployeeDashboard */}
      <div className="w-64 bg-linear-to-b from-green-50 to-white shadow-xl border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        {/* Enhanced Logo Section */}
        <div className="p-6 border-b border-green-100 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-700">WorkHub</h1>
              <p className="text-xs text-gray-500">Employee Dashboard</p>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
              Main Menu
            </h3>
            <ul className="space-y-1">
              <li>
                <div
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-green-600 hover:shadow-sm rounded-lg transition-all duration-200 group cursor-pointer"
                  onClick={() => router.push("/gigdaddy")}
                >
                  <span className="mr-3 text-lg">🏠</span>
                  <span>Dashboard</span>
                </div>
              </li>
              <li>
                <div className="flex items-center px-4 py-3 text-green-700 bg-green-50 rounded-lg border border-green-200 shadow-sm cursor-pointer">
                  <span className="mr-3 text-lg">💼</span>
                  <span className="font-semibold">My Jobs</span>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-green-600 hover:shadow-sm rounded-lg transition-all duration-200 group"
                >
                  <span className="mr-3 text-lg group-hover:scale-110 transition-transform">
                    📊
                  </span>
                  <span>Applications</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-green-600 hover:shadow-sm rounded-lg transition-all duration-200 group"
                >
                  <span className="mr-3 text-lg group-hover:scale-110 transition-transform">
                    💰
                  </span>
                  <span>Earnings</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-green-600 hover:shadow-sm rounded-lg transition-all duration-200 group"
                >
                  <span className="mr-3 text-lg group-hover:scale-110 transition-transform">
                    💬
                  </span>
                  <span>Message</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
              Account
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-green-600 hover:shadow-sm rounded-lg transition-all duration-200 group"
                >
                  <span className="mr-3 text-lg group-hover:scale-110 transition-transform">
                    ⚙️
                  </span>
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Enhanced User Profile Section */}
        <div className="p-4 border-t border-green-100 bg-white">
          <div className="flex items-center space-x-3 p-3 bg-linear-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
            <div className="w-12 h-12 bg-linear-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
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
              <p className="text-xs text-green-600 font-medium">
                Balance: {user.balance}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-8 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                My Jobs Management
              </h2>
              <p className="text-sm text-gray-500">
                Track and manage your job applications and work history
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="primary" size="sm" onClick={handleHelpClick}>
                Help
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Jobs Management Section */}
          <section className="mb-8">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                {[
                  {
                    key: "saved" as const,
                    label: "Saved Jobs",
                    count: jobsData.saved.length,
                  },
                  {
                    key: "active" as const,
                    label: "Active Jobs",
                    count: jobsData.active.length,
                  },
                  {
                    key: "completed" as const,
                    label: "Completed",
                    count: jobsData.completed.length,
                  },
                  {
                    key: "canceled" as const,
                    label: "Canceled",
                    count: jobsData.canceled.length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                      activeTab === tab.key
                        ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                        : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                    <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === "saved" && "Your Saved Jobs"}
                {activeTab === "active" && "Active Jobs"}
                {activeTab === "completed" && "Completed Jobs"}
                {activeTab === "canceled" && "Canceled Jobs"}
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Search Input */}
                <div className="text-black flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                    icon={
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    }
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Jobs Grid with Enhanced Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredJobs.map(renderJobCard)}
            </div>

            {/* No Results Message */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                  {activeTab === "saved" && "💾"}
                  {activeTab === "active" && "⚡"}
                  {activeTab === "completed" && "✅"}
                  {activeTab === "canceled" && "❌"}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No {activeTab} jobs found
                </h3>
                <p className="text-gray-500">
                  {activeTab === "saved" &&
                    "Start saving jobs that interest you!"}
                  {activeTab === "active" &&
                    "You currently have no active jobs."}
                  {activeTab === "completed" &&
                    "Your completed jobs will appear here."}
                  {activeTab === "canceled" && "No canceled jobs found."}
                </p>
              </div>
            )}
          </section>
        </main>

        {/* Footer - Same as EmployeeDashboard */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">WorkHub</h3>
                <p className="text-gray-400">
                  Connecting skilled workers with local job opportunities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">For Workers</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Find Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Applications
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Safety Tips
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 WorkHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Saved Job"
        message="Are you sure you want to remove this job from your saved list?"
        confirmText="Remove"
        cancelText="Keep"
        variant="warning"
      />
    </div>
  );
}

export default MyJobsPage;