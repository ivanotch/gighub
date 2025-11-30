"use client";

import React, { useState } from "react";
import ImageCard from "../components/landingpage/ImageCard";
import Button from "../components/landingpage/Button";
import Image from "next/image";
import Link from "next/link";
import { rocaTwo } from "./fonts";
import { useRouter } from "next/navigation";


function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleApplyClick = () => {
    router.push("/registration");
  };

  const services = [
    { id: 1, imageUrl: "/images/Lawnmower.png", title: "Lawn Care Specialist", subtitle: "Part-time/Flexible", description: "Taga tanggal ng damo sa bahay namin." },
    { id: 2, imageUrl: "/images/Barista.png", title: "Cafe Barista", subtitle: "Full-time Position", description: "Taga shake ng kape at iba pang inumin sa aming cafe. Training provided." },
    { id: 3, imageUrl: "/images/Construction.png", title: "Construction Laborer", subtitle: "Full-time Position", description: "Pagod na ako foreman." },
    { id: 4, imageUrl: "/images/Housework.png", title: "House Chores Specialist", subtitle: "Experienced Required", description: "LF taga linis ng bahay namin." },
    { id: 5, imageUrl: "/images/Laundryclerk.png", title: "Laundry Clerk", subtitle: "Full-time Position", description: "Responsible for washing, drying, and folding clothes. Attention to detail required." },
    { id: 6, imageUrl: "/images/Pastry.png", title: "Bakery Worker", subtitle: "Full-time Position", description: "Assist in baking and decorating pastries. Previous bakery experience is a plus." },
    { id: 7, imageUrl: "/images/Shopclerk.png", title: "Retail Shop Clerk", subtitle: "Full-time Position", description: "Manage sales and customer service in a retail environment. Good communication skills needed." },
    { id: 8, imageUrl: "/images/Tutor.png", title: "Academic Tutor", subtitle: "Experienced Required", description: "Provide academic support to students in various subjects. Patience and knowledge are essential." },
  ];

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Gigs" },
    { href: "#contact", label: "Contact" },
  ];

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
              <Button onClick={handleApplyClick} className="ml-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
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
                <Button onClick={handleApplyClick} className="bg-primary-100 hover:bg-primary-700 hover:text-white text-primary-900 font-bold text-xl px-10 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Apply Now
                </Button>
                <Button className="border-2 bg-primary-600 text-white hover:bg-primary-700 text-xl px-10 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Browse Gigs
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

      {/* Team Members Section - Modern Style */}
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
          name: "John Doe",
          role: "CEO",
          imageUrl: "/images/avatar.jpg",
          linkedin: "#",
          twitter: "#"
        },
        {
          name: "Jane Smith",
          role: "Head of Operations",
          imageUrl: "/images/avatar.jpg",
          linkedin: "#",
          twitter: "#"
        },
        {
          name: "Alice Johnson",
          role: "Marketing Lead",
          imageUrl: "/images/avatar.jpg",
          linkedin: "#",
          twitter: "#"
        },
        {
          name: "Bob Williams",
          role: "Product Manager",
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
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-primary-200 hover:ring-primary-400 transition-all duration-300">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
          <p className="text-primary-600 mb-4">{member.role}</p>

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
