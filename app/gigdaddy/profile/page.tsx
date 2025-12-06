"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Briefcase,
  MessageSquare,
  User,
  Settings,
  Star,
  Check,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Plus,
  ChevronRight,
  PhilippinePeso,
  ChevronDown,
} from "lucide-react";
import Head from "next/head";

function EmployeeProfile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Jay-ar Untalan",
    email: "jayaruntalanb22@gmail.com",
    phone: "+63 912 345 6789",
    location: "Mandaluyong City, Philippines",
    bio: "Good at manual labor tasks including packaging, labeling, inventory management, shipping, restocking, and order processing. Reliable and efficient worker with a strong work ethic.",
    skills: [
      "Packaging",
      "Labeling",
      "Order Processing",
    ],
    categoryService: ["E-Commerece"],
    rating: 4.7,
    totalReviews: 128,
    completedJobs: 45,
    memberSince: "January 2023",
    hourlyRate: "₱250/hour",
    availability: "Available Now",
    languages: ["Tagalog", "English"],
  });

  const [editForm, setEditForm] = useState(profileData);

  // Available category options
  const categoryOptions = ["Cleaning", "E-Commerce"];
  
  // Available skills options
  const skillOptions = [
        "Power Wash",
        "Deep Cleaning",
        "Dish Washer",
        "Laundry",
        "Cleaning Assistant",
        "Packaging",
        "Labeling",
        "Inventory Management",
        "Shipping/Dropping off",
        "Restocking",
        "Order Processing"

  ];

  const reviews = [
    {
      id: 1,
      name: "Maria Santos",
      rating: 5,
      date: "2 days ago",
      comment:
        "Jay-ar did an excellent job with our warehouse packaging. Highly recommend!",
      job: "Packaging",
    },
    {
      id: 2,
      name: "John Smith",
      rating: 4,
      date: "1 week ago",
      comment: "Good work on the labeling job. Would hire again.",
      job: "Labeling",
    },
    {
      id: 3,
      name: "Anna Reyes",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Very reliable and hardworking. Finished the inventory management job ahead of schedule!",
      job: "Inventory Management",
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Packaging",
      date: "Today",
      status: "In Progress",
      earnings: "₱500",
    },
    {
      id: 2,
      title: "Labeling",
      date: "Yesterday",
      status: "Completed",
      earnings: "₱750",
    },
  ];

  const stats = [
    {
      label: "Completed Jobs",
      value: profileData.completedJobs,
      icon: Briefcase,
    },
    { label: "Total Earnings", value: "₱45,800", icon: PhilippinePeso },
    { label: "Not Fully Verified", value: "0%", icon: Check },
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      setProfileData(editForm);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle adding a category
  const handleCategoryAdd = (category: string) => {
    if (!editForm.categoryService.includes(category)) {
      setEditForm((prev) => ({
        ...prev,
        categoryService: [...prev.categoryService, category],
      }));
    }
    setShowCategoryDropdown(false);
  };

  // Handle removing a category
  const handleCategoryRemove = (category: string) => {
    setEditForm((prev) => ({
      ...prev,
      categoryService: prev.categoryService.filter((c) => c !== category),
    }));
  };

  // Handle adding a skill
  const handleSkillAdd = (skill: string) => {
    if (!editForm.skills.includes(skill)) {
      setEditForm((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
    setShowSkillsDropdown(false);
  };

  // Handle removing a skill
  const handleSkillRemove = (skill: string) => {
    setEditForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  // Render category badges (for both edit and view modes)
  const renderCategoryBadges = (categories: string[], isEditing: boolean = false) => {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex items-center gap-1 ${
              isEditing 
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-blue-100 text-blue-800"
            } px-3 py-1.5 rounded-full`}
          >
            {category}
            {isEditing && (
              <button
                onClick={() => handleCategoryRemove(category)}
                className="text-blue-500 hover:text-blue-700 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render skill badges (for both edit and view modes)
  const renderSkillBadges = (skills: string[], isEditing: boolean = false) => {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center gap-1 ${
              isEditing 
                ? "bg-primary-50 text-primary-700 border border-primary-200"
                : "bg-primary-50 text-primary-700"
            } px-3 py-1.5 rounded-full`}
          >
            {skill}
            {isEditing && (
              <button
                onClick={() => handleSkillRemove(skill)}
                className="text-primary-500 hover:text-primary-700 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render category dropdown for editing
  const renderCategoryDropdown = () => {
    const availableCategories = categoryOptions.filter(
      (category) => !editForm.categoryService.includes(category)
    );

    if (availableCategories.length === 0) return null;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
        >
          <Plus className="w-4 h-4" />
          Add Category
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showCategoryDropdown && (
          <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            {availableCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryAdd(category)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render skills dropdown for editing
  const renderSkillsDropdown = () => {
    const availableSkills = skillOptions.filter(
      (skill) => !editForm.skills.includes(skill)
    );

    if (availableSkills.length === 0) return null;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
        >
          <Plus className="w-4 h-4" />
          Add Skill
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showSkillsDropdown && (
          <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillAdd(skill)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                {skill}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <Star
                key={index}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <Star
                key={index}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            );
          } else {
            return <Star key={index} className="w-5 h-5 text-gray-300" />;
          }
        })}
        <span className="ml-2 text-gray-700 font-semibold">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

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
                <button className="flex items-center px-4 py-3 text-primary-700 bg-primary-50 rounded-lg border border-primary-200 shadow-sm w-full text-left">
                  <User className="w-5 h-5 mr-3" />
                  <span className="font-semibold">Profile</span>
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
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {profileData.name}
              </p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600 ml-1">
                  {profileData.rating}
                </span>
              </div>
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
            <span className="text-white font-semibold text-sm">
              {profileData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Profile
              </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  {isEditing ? (
                    <Save className="w-5 h-5" />
                  ) : (
                    <Edit2 className="w-5 h-5" />
                  )}
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
                <button
                  onClick={() => router.push("/gigdaddy/settings")}
                  className="p-2.5 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-100 transition-colors"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-primary-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                        <span className="text-white text-4xl font-bold">
                          {profileData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      {isEditing && (
                        <button className="px-4 py-2 text-sm text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 flex items-center gap-2">
                          <Edit2 className="w-4 h-4" />
                          Change Photo
                        </button>
                      )}
                    </div>

                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          
                          {/* Category Service Section */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Category Service
                            </label>
                            {renderCategoryBadges(editForm.categoryService, true)}
                            <div className="flex gap-2">
                              {renderCategoryDropdown()}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bio
                            </label>
                            <textarea
                              value={editForm.bio}
                              onChange={(e) =>
                                handleInputChange("bio", e.target.value)
                              }
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          
                          {/* Skills Section */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Skills
                            </label>
                            {renderSkillBadges(editForm.skills, true)}
                            <div className="flex gap-2">
                              {renderSkillsDropdown()}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {profileData.name}
                          </h2>
                          <div className="flex items-center gap-2 mb-3">
                            {renderStars(profileData.rating)}
                            <span className="text-gray-500">
                              ({profileData.totalReviews} reviews)
                            </span>
                          </div>
                          
                          {/* Display (View Mode) */}
                          {profileData.categoryService.length > 0 && (
                            <div className="mb-4">
                              {renderCategoryBadges(profileData.categoryService)}
                            </div>
                          )}
                          
                          <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              <Check className="w-4 h-4 mr-1" />
                              {profileData.availability}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">
                            {profileData.bio}
                          </p>
                          
                          {/* Skills Display (View Mode) */}
                          {profileData.skills.length > 0 && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Skills
                              </label>
                              {renderSkillBadges(profileData.skills)}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <Icon className="text-primary-600 w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">
                              {stat.value}
                            </p>
                            <p className="text-sm text-gray-500">
                              {stat.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Jobs */}
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Recent Jobs
                  </h3>
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {job.title}
                          </p>
                          <p className="text-sm text-gray-500">{job.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              job.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {job.status}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {job.earnings}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={editForm.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">
                              {profileData.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Phone className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-900">
                              {profileData.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">
                              {profileData.location}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium text-gray-900">
                            {profileData.memberSince}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Reviews */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Recent Reviews
                  </h3>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b pb-4 last:border-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">
                              {review.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {review.job} • {review.date}
                            </p>
                          </div>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                    <button className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center gap-2">
                      View All Reviews
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

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
            className="flex flex-col items-center text-sm text-primary-600"
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

export default EmployeeProfile;