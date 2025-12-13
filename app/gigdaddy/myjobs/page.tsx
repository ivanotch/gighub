"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Briefcase,
  MessageSquare,
  User,
  Settings,
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Star,
  Eye,
  Bookmark,
  TrendingUp,
  Tag,
  ChevronRight,
  Plus,
  PhilippinePeso,
  Package,
  Sparkles,
} from "lucide-react";
import Head from "next/head";

function EmployeeMyJobs() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSalaryType, setSelectedSalaryType] = useState("all");
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "packaging", label: "Packaging" },
    { id: "labeling", label: "Labeling" },
    { id: "inventory", label: "Inventory Management" },
    { id: "shipping", label: "Shipping/Delivery" },
    { id: "restocking", label: "Restocking" },
    { id: "order", label: "Order Processing" },
    { id: "cleaning", label: "Cleaning" },
  ];

  const locations = [
    { id: "all", label: "All Locations" },
    { id: "mandaluyong", label: "Mandaluyong City" },
    { id: "makati", label: "Makati City" },
    { id: "taguig", label: "Taguig City" },
    { id: "pasig", label: "Pasig City" },
    { id: "quezon", label: "Quezon City" },
    { id: "manila", label: "Manila" },
    { id: "paranaque", label: "Parañaque City" },
  ];

  const salaryTypes = [
    { id: "all", label: "All Pay Types" },
    { id: "hourly", label: "Per Hour" },
    { id: "perpack", label: "Per Pack/Item" },
  ];


  const availableJobs = [
    {
      id: 1,
      title: "Order Processing Clerk",
      company: "E-commerce Hub PH",
      location: "Quezon City",
      salaryPerPack: "₱10/Pack",
      salaryType: "perpack",
      type: "Full Day",
      postedDate: "2 days ago",
      description:
        "Process online orders, prepare shipments, and ensure accurate packaging and labeling.",
      skills: [
        "Labeling",
        "Packaging",
        "Order Processing",
      ],
      distance: "5.2 km",
      ecommerce: true,
      category: "order",
    },
    {
      id: 2,
      title: "Inventory Management Assistant",
      company: "Retail Masters PH",
      location: "Makati City",
      salary: "₱80/hour",
      salaryType: "hourly",
      type: "Full Day",
      postedDate: "4 hours ago",
      description:
        "Help manage inventory, track stock levels, and assist with stock counts.",
      skills: [
        "Inventory Management",
      ],
      distance: "3.5 km",
      ecommerce: true,
      category: "inventory",
    },
    {
      id: 3,
      title: "Power Wash Technician",
      company: "",
      location: "Mandaluyong City",
      salary: "₱90/hour",
      salaryType: "hourly",
      type: "Full Day",
      postedDate: "5 hours ago",
      description:
        "Perform high-pressure washing for my Garage.",
      skills: [
        "Power Washing",
        "Deep Cleaning",
      ],
      distance: "1.5 km",
      cleaning: true, // depends if cleaning = true and so on in other categories
      category: "cleaning",
    },
    {
      id: 4,
      title: "House cleaner",
      company: "",
      location: "Quezon City",
      salary: "₱65/hour",
      salaryType: "hourly",
      type: "Night Shift",
      postedDate: "3 days ago",
      description:
        "cleaning of house",
      skills: [
        "Deep Cleaning",
        "Laundry",
      ],
      distance: "5.8 km",
      cleaning: true,
      category: "cleaning",
    },
  ];

  const recommendedJobs = availableJobs.slice(0, 3);

  const filteredJobs = availableJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || job.category === selectedCategory;

    const matchesLocation =
      selectedLocation === "all" ||
      job.location.toLowerCase().includes(selectedLocation);

    const matchesSalaryType =
      selectedSalaryType === "all" ||
      (selectedSalaryType === "hourly" && job.salaryType === "hourly") ||
      (selectedSalaryType === "perpack" && job.salaryType === "perpack");

    return (
      matchesSearch && matchesCategory && matchesLocation && matchesSalaryType
    );
  });

  const toggleSavedJob = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleApplyJob = (jobId: number) => {
    alert(`Applying for job #${jobId}`);
    // In a real app, this would navigate to application form or API call
  };

  // Count jobs by salary type
  const hourlyJobsCount = availableJobs.filter(
    (job) => job.salaryType === "hourly"
  ).length;
  const perPackJobsCount = availableJobs.filter(
    (job) => job.salaryType === "perpack"
  ).length;
  const cleaningJobsCount = availableJobs.filter(
    (job) => job.category === "cleaning"
  ).length;
  const ecommerceJobsCount = availableJobs.filter(
    (job) => job.ecommerce
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>

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
                <button className="flex items-center px-4 py-3 text-primary-700 bg-primary-50 rounded-lg border border-primary-200 shadow-sm w-full text-left">
                  <Briefcase className="w-5 h-5 mr-3" />
                  <span className="font-semibold">Browse Jobs</span>
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
              <span className="text-white font-semibold text-sm">JU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Jay-ar Untalan
              </p>
              <p className="text-xs text-primary-600 font-medium">
                Looking for jobs
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Browse Jobs
                </h1>
                <p className="text-gray-600">
                  Find your next gig opportunity from thousands of available
                  jobs
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Check My Current Job
                </button>

                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Quick Apply
                </button>
              </div>
            </div>

            {/* Stats and Highlights */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {availableJobs.length}
                    </p>
                    <p className="text-sm text-gray-600">Jobs Available</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">New jobs added daily</p>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {hourlyJobsCount}
                    </p>
                    <p className="text-sm text-gray-600">Hourly Jobs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Fixed hourly rates</p>
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {perPackJobsCount}
                    </p>
                    <p className="text-sm text-gray-600">Per Pack Jobs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">E-commerce packaging</p>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {cleaningJobsCount}
                    </p>
                    <p className="text-sm text-gray-600">Cleaning Jobs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Hourly rates only</p>
              </div>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search job titles, companies, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none min-w-[180px]"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none min-w-[180px]"
                    >
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <select
                      value={selectedSalaryType}
                      onChange={(e) => setSelectedSalaryType(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none min-w-[180px]"
                    >
                      {salaryTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Job List */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {filteredJobs.length} Jobs Found
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Sort by:</span>
                    <select className="border-0 bg-transparent font-medium focus:outline-none">
                      <option>Relevance</option>
                      <option>Newest</option>
                      <option>Highest Pay</option>
                      <option>Nearest</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {job.title}
                              </h3>
                              {job.ecommerce && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                  E-commerce
                                </span>
                              )}
                              {job.cleaning && (
                                <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs font-medium rounded-full">
                                  Cleaning
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 mb-1">{job.company}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location} • {job.distance} away
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {job.postedDate}
                              </span>
                            </div>

                            <p className="text-gray-600 mb-4">
                              {job.description}
                            </p>

                            {/* Highlighted Skills Section */}
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Tag className="w-4 h-4 text-primary-600" />
                                <h4 className="text-sm font-semibold text-gray-700">
                                  Required Skills:
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1.5 bg-gradient-to-r from-primary-100 to-primary-50 text-primary-800 rounded-lg text-sm font-medium border border-primary-200 shadow-sm hover:shadow transition-shadow"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Salary
                                  </p>
                                  <p className="font-semibold text-gray-900">
                                    {job.salaryType === "perpack" &&
                                    job.ecommerce
                                      ? job.salaryPerPack
                                      : job.salary}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {job.salaryType === "perpack"
                                      ? "Per Pack/Item"
                                      : "Per Hour"}
                                    {job.salaryType === "perpack" &&
                                      job.ecommerce &&
                                      ` (E-commerce)`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Shift Type
                                  </p>
                                  <p className="font-semibold text-gray-900">
                                    {job.type}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            <button
                              onClick={() => toggleSavedJob(job.id)}
                              className={`p-2 rounded-lg ${
                                savedJobs.includes(job.id)
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              <Bookmark
                                className={`w-5 h-5 ${
                                  savedJobs.includes(job.id)
                                    ? "fill-current"
                                    : ""
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                          <button className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                              Save for Later
                            </button>
                            <button
                              onClick={() => handleApplyJob(job.id)}
                              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium flex items-center gap-2"
                            >
                              Apply Now
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredJobs.length === 0 && (
                  <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No jobs found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search criteria or filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                        setSelectedLocation("all");
                        setSelectedSalaryType("all");
                      }}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
                {/* Recommended Jobs */}
                <div className="hidden lg:block bg-white rounded-xl shadow-sm border p-6 mb-6 h-[500px] ">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Recommended for You
                  </h3>
                  <div className="space-y-4">
                    {recommendedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {job.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {job.company}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-semibold text-primary-600">
                                {job.salaryType === "perpack" && job.ecommerce
                                  ? job.salaryPerPack
                                  : job.salary}
                              </span>
                              <span className="text-xs text-gray-500">
                                {job.distance} away
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {job.ecommerce && (
                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                  E-commerce
                                </span>
                              )}
                              {job.category === "cleaning" && (
                                <span className="text-xs px-2 py-0.5 bg-cyan-100 text-cyan-800 rounded-full">
                                  Cleaning
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

        </main>
      </div>

                    {/* Mobile Tab */}
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
            className="flex flex-col items-center text-sm text-primary-600"
            onClick={() => router.push("/gigdaddy/myjobs")}
          >
            <Briefcase className="w-6 h-6" />
            <span className="text-xs mt-1">Browse Jobs</span>
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
  );
}

export default EmployeeMyJobs;
