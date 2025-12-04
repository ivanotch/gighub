"use client";

import React, { useState } from "react";
import CategoryCarousel from "../components/landingpage/CategoryCarousel";
import Button from "../components/landingpage/Button";
import Image from "next/image";
import Link from "next/link";
import { rocaTwo } from "./fonts";
import { useRouter } from "next/navigation";

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

  // Updated categories with nested subservices
  const categories = [
    {
      id: 1,
      name: "Cleaning Services",
      description: "Professional cleaning for homes and businesses",
      mainImageUrl: "/images/Housework.png",
      subServices: [
        { id: 1, title: "House Cleaning", description: "Complete home cleaning service", icon: "🏠" },
        { id: 2, title: "Office Cleaning", description: "Commercial space maintenance", icon: "🏢" },
        { id: 3, title: "Deep Cleaning", description: "Intensive cleaning for special occasions", icon: "✨" },
        { id: 4, title: "Window Cleaning", description: "Indoor and outdoor window washing", icon: "🪟" },
        { id: 5, title: "Carpet Cleaning", description: "Professional carpet and upholstery cleaning", icon: "🧹" },
      ]
    },
    {
      id: 2,
      name: "Food & Beverage",
      description: "Culinary and hospitality positions",
      mainImageUrl: "/images/Barista.png",
      subServices: [
        { id: 1, title: "Barista", description: "Coffee preparation and service", icon: "☕" },
        { id: 2, title: "Bakery Assistant", description: "Pastry baking and preparation", icon: "🥐" },
        { id: 3, title: "Kitchen Staff", description: "Food preparation and cooking", icon: "👨‍🍳" },
        { id: 4, title: "Wait Staff", description: "Customer service and order taking", icon: "🍽️" },
        { id: 5, title: "Food Delivery", description: "Local food delivery service", icon: "🛵" },
      ]
    },
    {
      id: 3,
      name: "Construction",
      description: "Building and renovation services",
      mainImageUrl: "/images/Construction.png",
      subServices: [
        { id: 1, title: "General Laborer", description: "Basic construction assistance", icon: "🔨" },
        { id: 2, title: "Carpenter", description: "Woodworking and framing", icon: "🪚" },
        { id: 3, title: "Painter", description: "Interior and exterior painting", icon: "🎨" },
        { id: 4, title: "Electrician Assistant", description: "Electrical work support", icon: "⚡" },
        { id: 5, title: "Plumbing Assistant", description: "Plumbing installation and repair", icon: "🔧" },
      ]
    },
    {
      id: 4,
      name: "Landscaping",
      description: "Outdoor maintenance and gardening",
      mainImageUrl: "/images/Lawnmower.png",
      subServices: [
        { id: 1, title: "Lawn Care", description: "Mowing and lawn maintenance", icon: "🌱" },
        { id: 2, title: "Gardener", description: "Plant care and garden design", icon: "🌷" },
        { id: 3, title: "Tree Service", description: "Tree trimming and removal", icon: "🌳" },
        { id: 4, title: "Irrigation", description: "Sprinkler system installation", icon: "💧" },
        { id: 5, title: "Hardscaping", description: "Patio and walkway construction", icon: "🧱" },
      ]
    },
    {
      id: 5,
      name: "Retail & Sales",
      description: "Customer service and sales positions",
      mainImageUrl: "/images/Shopclerk.png",
      subServices: [
        { id: 1, title: "Sales Associate", description: "Retail customer service", icon: "💳" },
        { id: 2, title: "Cashier", description: "Point of sale operations", icon: "💰" },
        { id: 3, title: "Store Manager", description: "Retail operations management", icon: "👔" },
        { id: 4, title: "Inventory Clerk", description: "Stock management and organization", icon: "📦" },
        { id: 5, title: "Visual Merchandiser", description: "Store display arrangement", icon: "🛍️" },
      ]
    },
    {
      id: 6,
      name: "Education",
      description: "Teaching and tutoring services",
      mainImageUrl: "/images/Tutor.png",
      subServices: [
        { id: 1, title: "Academic Tutor", description: "Subject-specific tutoring", icon: "📚" },
        { id: 2, title: "Music Teacher", description: "Instrument and voice lessons", icon: "🎵" },
        { id: 3, title: "Language Instructor", description: "Foreign language teaching", icon: "🗣️" },
        { id: 4, title: "Test Prep Coach", description: "Exam preparation assistance", icon: "✏️" },
        { id: 5, title: "Child Care", description: "Babysitting and child supervision", icon: "👶" },
      ]
    },
    {
      id: 7,
      name: "Laundry Services",
      description: "Clothing care and maintenance",
      mainImageUrl: "/images/Laundryclerk.png",
      subServices: [
        { id: 1, title: "Laundry Attendant", description: "Washing and folding service", icon: "👕" },
        { id: 2, title: "Dry Cleaning", description: "Specialty fabric care", icon: "🧥" },
        { id: 3, title: "Ironing Service", description: "Professional pressing and steaming", icon: "🧺" },
        { id: 4, title: "Alterations", description: "Clothing repair and fitting", icon: "🪡" },
        { id: 5, title: "Pickup & Delivery", description: "Convenient laundry service", icon: "🚚" },
      ]
    },
    {
      id: 8,
      name: "Automotive",
      description: "Vehicle maintenance and repair",
      mainImageUrl: "/images/Construction.png", // You can replace this with a car image
      subServices: [
        { id: 1, title: "Car Wash", description: "Vehicle cleaning and detailing", icon: "🚗" },
        { id: 2, title: "Mechanic Assistant", description: "Auto repair support", icon: "🔧" },
        { id: 3, title: "Tire Service", description: "Tire rotation and replacement", icon: "🛞" },
        { id: 4, title: "Oil Change", description: "Basic vehicle maintenance", icon: "🛢️" },
        { id: 5, title: "Detailing", description: "Interior and exterior detailing", icon: "✨" },
      ]
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
    // You can add logic to show a modal or navigate to category details
    console.log('Category clicked:', category);
  };

  return (
    <div className="min-h-screen text-foreground bg-background">
      {/* Navbar */}
      <nav className="bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/">
                <Image src="/gigdaddy-logo.png" alt="GigDaddy Logo" height={200} width={200} />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href} className="relative px-3 py-2 text-primary-900 hover:text-primary-600 font-medium transition-colors duration-300 group">
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <Button onClick={handleLoginClick} className="ml-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer">
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg mt-2 rounded-lg p-4 flex flex-col space-y-4">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href} className="text-primary-900 font-medium hover:text-primary-600 transition-colors">
                  {item.label}
                </a>
              ))}
              <Button onClick={handleApplyClick} className="w-full bg-primary-600 text-white py-2 rounded-lg">
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-white text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="space-y-8 lg:col-span-7">
              <h1 className={`${rocaTwo.className} text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-900 leading-tight tracking-tight`}>
                Your Next Great <span className="text-primary-600">Gig Opportunity</span> is Here.
              </h1>
              <p className="text-xl text-primary-950 max-w-2xl font-light">
                Connecting you directly to high-paying, flexible, and full-time Gigs across various industries. Start your application today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button onClick={handleApplyClick} className="bg-primary-100 hover:bg-primary-700 hover:text-white text-white font-bold text-xl px-10 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                  Apply Now
                </Button>
              </div>

              <div className="pt-4 text-primary-200 text-sm font-medium">
                Trusted by 5,000+ local businesses and thousands of applicants.
              </div>
            </div>

            <div className="lg:col-span-5 relative hidden lg:block">
              <img
                src="/images/deal.jpg"
                alt="Gig application illustration"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl shadow-primary-950/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Updated with Category Carousel */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
              <span className="w-2.5 h-2.5 bg-primary-600 rounded-full animate-pulse"></span>
              Browse Categories
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground ${rocaTwo.className}`}>
              Explore Service Categories
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-8">
              Find opportunities that match your skills. Each category contains multiple specialized gigs.
            </p>
            
            {/* Category Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">{categories.length}</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">
                  {categories.reduce((total, cat) => total + cat.subServices.length, 0)}
                </div>
                <div className="text-gray-600">Available Gigs</div>
              </div>
            </div>
          </div>

          {/* Category Carousel */}
          <div className="mb-12">
            <CategoryCarousel
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          </div>

          {/* Featured Categories Grid */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Most Popular Categories</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">These categories have the highest number of available gigs right now</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-2xl hover:border-primary-200 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-50 p-2 group-hover:bg-primary-100 transition-colors">
                      <img
                        src={category.mainImageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">{category.subServices.length} services</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {category.subServices.slice(0, 3).map((service) => (
                      <div key={service.id} className="flex items-center text-sm group/item">
                        <span className="mr-3 text-lg">{service.icon}</span>
                        <div>
                          <span className="text-gray-700 group-hover/item:text-primary-600 transition-colors">
                            {service.title}
                          </span>
                          <p className="text-xs text-gray-500 truncate">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors">
                      View All Services
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Button 
              onClick={() => console.log('Explore all clicked')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              Explore All {categories.length} Categories
            </Button>
            <p className="text-gray-600 mt-4">Over {categories.reduce((total, cat) => total + cat.subServices.length, 0)} gigs available</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary-200/50">
                <img src="/images/Lawnmower.png" alt="About Our Company" className="w-full h-96 object-cover" />
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <h2 className={`text-4xl md:text-5xl font-bold text-foreground ${rocaTwo.className}`}>
                Why Join the GigDaddy Team?
              </h2>
              <p className="text-lg text-foreground/80">
                We're not just a Gig platform—we're a community committed to connecting great talent with genuine opportunities. Discover why thousands choose GigDaddy every month.
              </p>

              <div className="space-y-5">
                {[
                  { title: "Competitive Compensation", desc: "Industry-leading pay with performance bonuses.", icon: "ri-money-dollar-circle-line" },
                  { title: "Career Growth", desc: "Clear promotion paths and professional development.", icon: "ri-bar-chart-line" },
                  { title: "Great Benefits", desc: "Health insurance, retirement plans, and paid time off.", icon: "ri-shield-flash-line" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary-200 p-2 rounded-full shrink-0 flex items-center justify-center">
                      <i className={`${item.icon} text-primary-800 text-3xl`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-foreground mb-1">{item.title}</h4>
                      <p className="text-foreground/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md">
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
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground ${rocaTwo.className}`}>
              Meet Our Team
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              The passionate professionals behind GigDaddy. Together, we make opportunities possible.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Charlz Ivan John Babida",
                imageUrl: "/images/avatar.jpg",
                linkedin: "#",
                twitter: "#"
              },
              {
                name: "John Matthew Perez",
                imageUrl: "/images/avatar.jpg",
                linkedin: "#",
                twitter: "#"
              },
              {
                name: "Trisha Fate Salubre",
                imageUrl: "/images/avatar.jpg",
                linkedin: "#",
                twitter: "#"
              },
              {
                name: "Jay-Ar Untalan",
                imageUrl: "/images/avatar.jpg",
                linkedin: "#",
                twitter: "#"
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

                <h3 className="text-xl font-bold text-foreground mb-3">{member.name}</h3>

                {/* Social Icons */}
                <div className="flex space-x-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-600 hover:text-white transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <i className="ri-linkedin-line text-lg"></i>
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-400 hover:text-white transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <i className="ri-twitter-line text-lg"></i>
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
                Connecting talented professionals with rewarding careers. Your future starts here.
              </p>
              <div className="flex space-x-6 pt-2">
                {/* Social Icons */}
                <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">📘</a>
                <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">🔗</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-primary-300 mb-6 border-b border-primary-800 pb-2">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-primary-400 transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-primary-300 mb-6 border-b border-primary-800 pb-2">Contact Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2">📞 <span className="hover:text-primary-400 transition-colors">(555) 123-4567</span></li>
                <li className="flex items-center space-x-2">✉️ <span className="hover:text-primary-400 transition-colors">careers@GigDaddy.com</span></li>
                <li className="flex items-center space-x-2">📍 <span className="hover:text-primary-400 transition-colors">123 Primary St, Garden City</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} GigDaddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;