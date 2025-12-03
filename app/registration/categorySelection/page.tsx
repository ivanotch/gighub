'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function CategorySelection() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Categories - cleaning is available, others are coming soon
  const categories = [
    {
      id: 'cleaning',
      name: "Cleaning Services",
      description: "Professional cleaning for homes and businesses",
      icon: "🧹",
      subServices: [
        "House Cleaning",
        "Office Cleaning", 
        "Deep Cleaning",
        "Window Cleaning",
        "Carpet Cleaning",
        "Commercial Cleaning"
      ],
      available: true,
      popular: true
    },
    {
      id: 'construction',
      name: "Construction",
      description: "Building, renovation and repair work",
      icon: "👷",
      subServices: [
        "General Labor",
        "Carpentry",
        "Painting",
        "Electrical",
        "Plumbing"
      ],
      available: false,
      comingSoon: true
    },
    {
      id: 'food',
      name: "Food & Beverage",
      description: "Culinary and hospitality positions",
      icon: "🍽️",
      subServices: [
        "Barista",
        "Wait Staff",
        "Kitchen Staff",
        "Food Delivery",
        "Bakery Assistant"
      ],
      available: false,
      comingSoon: true
    },
    {
      id: 'landscaping',
      name: "Landscaping",
      description: "Outdoor maintenance and gardening",
      icon: "🌱",
      subServices: [
        "Lawn Care",
        "Gardening",
        "Tree Service",
        "Irrigation",
        "Hardscaping"
      ],
      available: false,
      comingSoon: true
    }
  ]

  const handleSelect = (categoryId: string, available: boolean) => {
    if (available) {
      setSelectedCategory(categoryId)
    }
  }

  const handleNext = () => {
    if (selectedCategory) {
      router.push('/registration/accountVerification/faceVerification')
    }
  }
   const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">


      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What type of work are you interested in?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pick what where your skills shine the most.
          </p>
        </div>

        {/* Category Selection Cards in ROW layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id
            const isAvailable = category.available
            
            return (
              <div
                key={category.id}
                onClick={() => handleSelect(category.id, isAvailable)}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-200 min-h-[320px] flex flex-col
                  ${!isAvailable 
                    ? 'border-gray-200 bg-gray-50/50 cursor-not-allowed opacity-70' 
                    : isSelected 
                      ? 'border-primary-600 bg-primary-50 shadow-sm cursor-pointer' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                  }
                `}
              >
                {/* Selection Indicator */}
                {isAvailable && (
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-primary-600 bg-primary-600'
                      : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                )}

                {/* Icon */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                  !isAvailable ? 'bg-gray-200' : isSelected ? 'bg-primary-100' : 'bg-gray-100'
                }`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    !isAvailable ? 'text-gray-500' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    !isAvailable ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {category.description}
                  </p>
                  
                  {/* Skills/Sub-services Chips */}
                  <div className="space-y-1">
                    {category.subServices.slice(0, 3).map((skill, index) => (
                      <div 
                        key={index}
                        className={`text-sm px-3 py-1 rounded-full ${
                          !isAvailable 
                            ? 'bg-gray-200 text-gray-500' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        • {skill}
                      </div>
                    ))}
                    {category.subServices.length > 3 && (
                      <div className={`text-sm px-3 py-1 rounded-full ${
                        !isAvailable 
                          ? 'bg-gray-200 text-gray-500' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        +{category.subServices.length - 3} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-4">
                  {category.popular && isAvailable && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      Most Popular
                    </span>
                  )}
                  {category.comingSoon && !isAvailable && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>



        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Left: Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors text-base"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleNext}
                disabled={!selectedCategory}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
                <svg 
                  className="w-5 h-5 ml-2 inline-block" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySelection