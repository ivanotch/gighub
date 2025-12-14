"use client";

import React, { useState } from "react";
import CategoryCarousel from "../components/landingpage/CategoryCarousel";
import Button from "../components/landingpage/Button";
import Image from "next/image";
import Link from "next/link";
import { rocaTwo } from "./fonts";
import { useRouter } from "next/navigation";
import {
  BrushCleaning,
  ShoppingBag,
  Sparkles,
  Droplets,
  Shirt,
  Users,
  Package,
  Tag,
  BarChart,
  Truck,
  Package2,
  CheckCircle,
  Check,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  ChevronRight,
  DollarSign,
  Briefcase,
  Award,
  Shield,
  Clock,
  Zap,
  Home,
  Building,
  Palette,
  Code,
  Camera,
  PenTool,
  Monitor,
  Video,
  Utensils,
  ChefHat,
  Pizza,
  Cake,
  Coffee,
  Wine,
  Calendar,
  ClipboardCheck,
  Layout,
  Settings,
} from "lucide-react";

function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleApplyClick = () => {
    router.push("/registration");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  // Categories with exact subservices you provided
  const categories = [
    {
      id: 2,
      name: "House Chores",
      description: "Professional cleaning for homes and businesses",
      icon: BrushCleaning,
      subServices: [
        {
          id: 1,
          title: "Power Wash",
          description: "High-pressure exterior cleaning",
          icon: Droplets,
        },
        {
          id: 2,
          title: "Deep Cleaning",
          description: "Intensive comprehensive cleaning",
          icon: Sparkles,
        },
        {
          id: 3,
          title: "Dish Washer",
          description: "Commercial dish washing",
          icon: Shirt,
        },
        {
          id: 4,
          title: "Laundry",
          description: "Clothing and linen cleaning",
          icon: Shirt,
        },
        {
          id: 5,
          title: "Cleaning Assistant",
          description: "General cleaning support",
          icon: Users,
        },
      ],
      stats: {
        availableJobs: 123,
        rating: 4.8,
        quickHire: true,
      },
    },
    {
      id: 1,
      name: "E-commerce",
      description: "Online retail and fulfillment operations",
      icon: ShoppingBag,
      subServices: [
        {
          id: 1,
          title: "Packaging",
          description: "Product packaging and preparation",
          icon: Package,
        },
        {
          id: 2,
          title: "Labeling",
          description: "Inventory labeling and organization",
          icon: Tag,
        },
        {
          id: 3,
          title: "Inventory Management",
          description: "Stock tracking and management",
          icon: BarChart,
        },
        {
          id: 4,
          title: "Shipping/Dropping off",
          description: "Order shipping and logistics",
          icon: Truck,
        },
        {
          id: 5,
          title: "Restocking",
          description: "Warehouse restocking operations",
          icon: Package2,
        },
        {
          id: 6,
          title: "Order Processing",
          description: "Order fulfillment and processing",
          icon: CheckCircle,
        },
      ],
      stats: {
        availableJobs: 189,
        rating: 4.6,
        quickHire: true,
      },
    },
    {
      id: 3,
      name: "Catering Service",
      description: "Professional food service and event catering",
      icon: ChefHat,
      subServices: [
        {
          id: 1,
          title: "Cleanup Crew",
          description: "Event coordination and logistics",
          icon: Sparkles,
        },
        {
          id: 2,
          title: "Table Setting",
          description: "Table arrangement and decoration",
          icon: Layout,
        },
        {
          id: 3,
          title: "Equipment Setup",
          description: "Rental equipment installation",
          icon: Settings,
        },
        {
          id: 4,
          title: "Staff Management",
          description: "Team coordination and supervision",
          icon: Users,
        },
        {
          id: 5,
          title: "Inventory Control",
          description: "Supply tracking and management",
          icon: ClipboardCheck,
        },
        {
          id: 6,
          title: "Venue Coordination",
          description: "Site management and liaison",
          icon: MapPin,
        },
      ],
      stats: {
        availableJobs: 145,
        rating: 4.7,
        quickHire: true,
      },
    },
  ];

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Gigs" },
    { href: "#contact", label: "Contact" },
  ];

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    console.log("Category clicked:", category);
  };

  // Calculate totals
  const totalGigs = categories.reduce(
    (total, cat) => total + cat.subServices.length,
    0
  );
  const totalJobs = categories.reduce(
    (total, cat) => total + cat.stats.availableJobs,
    0
  );

  return (
    <div className="min-h-screen text-foreground bg-background">
      {/* Navbar */}
      <nav className="bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/">
                <Image
                  src="/gigdaddy-logo.png"
                  alt="GigDaddy Logo"
                  height={200}
                  width={200}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-2 text-primary-900 hover:text-primary-600 font-medium transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <Button
                onClick={handleLoginClick}
                className="ml-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer"
              >
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-primary-900 hover:bg-primary-100 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg mt-2 rounded-lg p-4 flex flex-col space-y-4">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-primary-900 font-medium hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Button
                onClick={handleApplyClick}
                className="w-full bg-primary-600 text-white py-2 rounded-lg"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-white text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="space-y-8 lg:col-span-7 mt-30">
              <h1
                className={`${rocaTwo.className} text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-900 leading-tight tracking-tight`}
              >
                Your Next Great{" "}
                <span className="text-primary-600">Gig Opportunity</span> is
                Here.
              </h1>
              <p className="text-xl text-primary-950 max-w-2xl font-light">
                Connecting you directly to high-paying, flexible, and full-time
                Gigs in E-commerce, Catering Service, & House Chores Services.
                Start your application today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  onClick={handleApplyClick}
                  className="bg-primary-600 hover:bg-primary-700 hover:text-white text-white font-bold text-xl px-10 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Apply Now
                </Button>
              </div>

              <div className="pt-4 text-primary-200 text-sm font-medium">
                Trusted by 5,000+ local businesses and thousands of applicants.
              </div>
            </div>

            <div className="lg:col-span-4 relative hidden lg:block ms-15">
              <Image
                src="/images/gd-hero.png"
                alt="Gig application illustration"
                width={600}
                height={100}
               className="w-full h-auto scale-170 object-cover bg-transparent drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
              <span className="w-2.5 h-2.5 bg-primary-600 rounded-full animate-pulse"></span>
              Browse Our Top Categories
            </div>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 text-foreground ${rocaTwo.className}`}
            >
              Explore High-Demand Categories
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-8">
              Focused on quality opportunities in our most popular sectors. Find
              your perfect gig match.
            </p>

            {/* Category Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">
                  {categories.length}
                </div>
                <div className="text-gray-600">Featured Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">
                  {totalGigs}
                </div>
                <div className="text-gray-600">Service Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">
                  {totalJobs}+
                </div>
                <div className="text-gray-600">Available Jobs</div>
              </div>
            </div>
          </div>

          {/* Category Cards Grid  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 ">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isEcommerce = category.id === 1;

              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-300 min-h-[380px] flex flex-col cursor-pointer ${
                    isEcommerce
                      ? "bg-gradient-to-br from-primary-50 to-white border-primary-300 shadow-xl transform lg:scale-105 border-2 border-[#0e1943]"
                      : "bg-white hover:border-primary-300 hover:shadow-xl"
                  } group`}
                >
                  {/* Category Header */}
                  <div className="flex items-start justify-between mb-6 ">
                    <div className="flex items-center gap-4 ">
                      <div
                        className={`flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center  ${
                          isEcommerce ? "bg-primary-200" : "bg-primary-100"
                        } group-hover:bg-primary-200 transition-colors`}
                      >
                        <IconComponent
                          className={`w-10 h-10 ${
                            isEcommerce
                              ? "text-primary-700"
                              : "text-primary-600"
                          }`}
                        />
                      </div>
                      <div>
                        <h3
                          className={`text-2xl font-bold ${
                            isEcommerce ? "text-primary-800" : "text-gray-900"
                          }`}
                        >
                          {category.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Stats Badge */}
                    <div className="flex flex-col items-end gap-2 ">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          isEcommerce
                            ? "bg-primary-100 text-primary-800"
                            : "bg-primary-50 text-primary-700"
                        }`}
                      >
                        {category.stats.availableJobs} jobs
                      </div>
                      {category.stats.quickHire && (
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                            isEcommerce
                              ? "bg-green-100 text-green-800"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          <Zap className="w-3 h-3" />
                          Quick Hire
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sub-services */}
                  <div className="mb-6">
                    <h4
                      className={`font-semibold mb-4 ${
                        isEcommerce ? "text-primary-700" : "text-gray-700"
                      }`}
                    >
                      Available Services:
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {category.subServices.map((service) => {
                        const ServiceIcon = service.icon;
                        return (
                          <div
                            key={service.id}
                            className={`flex items-center gap-3 text-sm p-3 rounded-lg transition-colors group/item ${
                              isEcommerce
                                ? "bg-primary-50 hover:bg-primary-100"
                                : "bg-gray-50 hover:bg-primary-50"
                            }`}
                          >
                            <ServiceIcon
                              className={`w-4 h-4 flex-shrink-0 ${
                                isEcommerce
                                  ? "text-primary-600 group-hover/item:text-primary-700"
                                  : "text-gray-500 group-hover/item:text-primary-600"
                              }`}
                            />
                            <div className="min-w-0">
                              <span
                                className={`font-medium block truncate transition-colors ${
                                  isEcommerce
                                    ? "text-primary-700 group-hover/item:text-primary-800"
                                    : "text-gray-700 group-hover/item:text-primary-600"
                                }`}
                              >
                                {service.title}
                              </span>
                              <p className="text-xs text-gray-500 truncate">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category Stats Footer */}
                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Award
                            className={`w-4 h-4 ${
                              isEcommerce
                                ? "text-primary-600"
                                : "text-yellow-500"
                            }`}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {category.stats.rating}/5
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock
                            className={`w-4 h-4 ${
                              isEcommerce ? "text-primary-600" : "text-blue-500"
                            }`}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Flexible
                          </span>
                        </div>
                      </div>
                      <button
                        className={`inline-flex items-center font-semibold transition-colors ${
                          isEcommerce
                            ? "text-primary-700 hover:text-primary-800"
                            : "text-primary-600 hover:text-primary-700"
                        }`}
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info Section - Updated for all three categories */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Our Categories?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our most reliable and high-demand sectors with consistent work
                opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cleaning Services Benefits */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <BrushCleaning className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">
                      House Chores
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Immediate start opportunities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Residential & commercial work</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Equipment provided</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* E-commerce Benefits - Highlighted */}
              <div className="space-y-4 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
                <div className="flex items-start gap-4 border-2 border-primary-200 rounded-xl p-4 bg-primary-50">
                  <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                    <ShoppingBag className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary-800 mb-2">
                      E-commerce
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary-600" />
                        <span>Highest job availability</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary-600" />
                        <span>Year-round consistent work</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary-600" />
                        <span>Career advancement paths</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Catering Service Benefits */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
                    <ChefHat className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">
                      Catering Service
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Flexible event schedules</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Learn culinary skills</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Tips and bonuses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button
              onClick={handleApplyClick}
              className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl text-lg transform hover:-translate-y-1"
            >
              Start Your Application Today
            </Button>
            <p className="text-gray-600 mt-4">
              {totalJobs}+ gigs currently available across {totalGigs} service
              types
            </p>
          </div>
        </div>
      </section>

      {/* About Section - Updated text */}
      <section id="about" className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary-200/50">
                <img
                  src="/images/deal.png"
                  alt="About Our Company"
                  className="w-full h-96 object-cover bg-white"
                />
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <h2
                className={`text-4xl md:text-5xl font-bold text-foreground ${rocaTwo.className}`}
              >
                Why Choose GigDaddy?
              </h2>
              <p className="text-lg text-foreground/80">
                We specialize in connecting talented individuals with
                high-quality opportunities in E-commerce, Catering Service, and
                Cleaning Services. Join thousands who've found their perfect gig
                through us.
              </p>

              <div className="space-y-5">
                {[
                  {
                    title: "Immediate Start",
                    desc: "Get started quickly with our streamlined application process.",
                    icon: Zap,
                  },
                  {
                    title: "Weekly Payments",
                    desc: "Reliable weekly payments with direct deposit options.",
                    icon: DollarSign,
                  },
                  {
                    title: "Career Support",
                    desc: "Ongoing training and career development opportunities.",
                    icon: Briefcase,
                  },
                ].map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-primary-200 p-2 rounded-full shrink-0 flex items-center justify-center">
                        <ItemIcon className="text-primary-800 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-foreground/70">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={handleApplyClick}
                className="mt-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md"
              >
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 text-foreground ${rocaTwo.className}`}
            >
              Meet Our Team
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              The passionate professionals behind GigDaddy. Together, we make
              opportunities possible.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Charlz Ivan John Babida",
                imageUrl: "/images/avatar.jpg",
                linkedin: "#",
                twitter: "#",
              },
              {
                name: "John Matthew Perez",
                imageUrl: "/images/avatar.jpg",
                linkedin: "#",
                twitter: "#",
              },
              {
                name: "Trisha Fate Salubre",
                imageUrl: "/images/avatar.jpg",
                linkedin: "#",
                twitter: "#",
              },
              {
                name: "Jay-Ar Untalan",
                imageUrl: "/images/avatar.jpg",
                linkedin: "#",
                twitter: "#",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image with border gradient */}
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-3 ring-primary-500 ring-offset-4 ring-offset-slate-50 transition-all duration-300">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {member.name}
                </h3>

                {/* Social Icons */}
                <div className="flex space-x-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-600 hover:text-white transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-400 hover:text-white transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <h3 className="text-3xl font-bold text-primary-400">GigDaddy</h3>
              <p className="text-gray-400 max-w-md">
                Connecting talented professionals with rewarding careers in
                E-commerce, Catering Service, & Cleaning Services. Your future
                starts here.
              </p>
              <div className="flex space-x-6 pt-2">
                <a
                  href="#"
                  className="text-gray-500 hover:text-primary-400 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-primary-400 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-primary-300 mb-6 border-b border-primary-800 pb-2">
                Quick Links
              </h4>
              <ul className="space-y-3 text-gray-400">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-primary-300 mb-6 border-b border-primary-800 pb-2">
                Contact Us
              </h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="hover:text-primary-400 transition-colors">
                    (555) 123-4567
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="hover:text-primary-400 transition-colors">
                    careers@GigDaddy.com
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="hover:text-primary-400 transition-colors">
                    123 Primary St, Garden City
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} GigDaddy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
