// app/page.tsx
import React from "react";
import ImageCard from "../components/ImageCard";
import Button from "../components/Button";
import Link from "next/link";

function LandingPage() {
  // Services data
  const services = [
    {
      id: 1,
      imageUrl: "/images/Lawnmower.png",
      title: "Lawn Care",
      subtitle: "Part-time/Flexible",
      description: "Taga tanggal ng damo sa bahay namin.",
    },
    {
      id: 2,
      imageUrl: "/images/Barista.png",
      title: "Barista",
      subtitle: "Full-time Position",
      description:
        "Taga shake ng kape at iba pang inumin sa aming cafe. Training provided.",
    },
    {
      id: 3,
      imageUrl: "/images/Construction.png",
      title: "Construction Laborer",
      subtitle: "Full-time Position",
      description: "Pagod na ako foreman.",
    },
    {
      id: 4,
      imageUrl: "/images/Housework.png",
      title: "House Chores Specialist",
      subtitle: "Experienced Required",
      description: "LF taga linis ng bahay namin.",
    },
    {
      id: 5,
      imageUrl: "/images/Laundryclerk.png",
      title: "Laundry Clerk",
      subtitle: "Full-time Position",
      description:
        "Responsible for washing, drying, and folding clothes. Attention to detail required.",
    },
    {
      id: 6,
      imageUrl: "/images/Pastry.png",
      title: "Bakery Worker",
      subtitle: "Full-time Position",
      description:
        "Assist in baking and decorating pastries. Previous bakery experience is a plus.",
    },
    {
      id: 7,
      imageUrl: "/images/Shopclerk.png",
      title: "Shop Clerk",
      subtitle: "Full-time Position",
      description:
        "Manage sales and customer service in a retail environment. Good communication skills needed.",
    },
    {
      id: 8,
      imageUrl: "/images/Tutor.png",
      title: "Tutor",
      subtitle: "Experienced Required",
      description:
        "Provide academic support to students in various subjects. Patience and knowledge are essential.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with enhanced styling */}
            <div className="shrink-0 flex items-center">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="w-8 h-8 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <h1 className="text-2xl font-bold text-white">GigDaddy</h1>
              </div>
            </div>

            {/* Enhanced Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#services", label: "Services" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-white hover:text-green-600 font-medium transition-all duration-300 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}

              {/* Enhanced CTA Button */}
              <Button variant="success" className="ml-4 px-6 bg-green-500">
                <span className="flex items-center space-x-2">
                  <span>Apply Now</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Button>
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
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
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-linear-to-r from-green-500 to-emerald-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your Dream Job in Landscaping
              </h1>
              <p className="text-xl text-green-100 max-w-2xl">
                Join the leading landscaping company and build your career with
                competitive pay, comprehensive benefits, and opportunities for
                growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/Selection">
                  <Button
                    variant="success"
                    size="lg"
                    className="bg-green-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Apply Today
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-green-600 text-lg px-8"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="bg-green-400 rounded-2xl p-2 transform rotate-2">
                <div className="bg-green-300 rounded-xl p-2 transform -rotate-1">
                  <img
                    src="/images/Lawnmower.png"
                    alt="Professional Landscaping Team"
                    className="w-full h-80 object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20  bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Open Positions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-linear-to-r from-gray-900 to-green-600 bg-clip-text">
              Find Your Perfect Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover opportunities that match your skills and passion.
              <span className="text-green-600 font-semibold">
                {" "}
                {services.length} positions{" "}
                {/* Dependes how many srvices are active */}
              </span>{" "}
              available with competitive benefits and growth potential.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-30 gap-y-6">
            {services.map((service) => (
              <ImageCard
                key={service.id}
                imageUrl={service.imageUrl}
                imageAlt={service.title}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                size="md"
                imageFit="cover"
                className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200"
                action={
                  <Button
                    variant="success"
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Apply Now
                  </Button>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-linear-to-r from-emerald-600 to-green-500 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About Image */}
            <div className="relative">
              <div className="bg-green-200 rounded-2xl p-4 transform -rotate-2">
                <img
                  src="/images/Lawnmower.png"
                  alt="About Our Company"
                  className="w-full h-96 object-cover rounded-lg shadow-lg transform rotate-1"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Why Work With Us?
              </h2>
              <p className="text-lg text-gray-600">
                We're not just a landscaping company - we're a family of
                dedicated professionals committed to excellence, innovation, and
                employee growth.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Competitive Compensation
                    </h4>
                    <p className="text-gray-600">
                      Industry-leading pay with performance bonuses
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Career Growth
                    </h4>
                    <p className="text-gray-600">
                      Clear promotion paths and professional development
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Great Benefits
                    </h4>
                    <p className="text-gray-600">
                      Health insurance, retirement plans, and paid time off
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="success" size="lg" className="mt-6">
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                GigDaddy
              </h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Connecting talented professionals with rewarding careers in
                landscaping and horticulture. Your future in green industry
                starts here.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 (555) 123-4567</li>
                <li>✉️ careers@GigDaddy.com</li>
                <li>📍 123 Green Street, Garden City</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GigDaddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
