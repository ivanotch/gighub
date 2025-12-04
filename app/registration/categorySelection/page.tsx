'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BrushCleaning, 
  ShoppingBag, 
  Drill, 
  Truck as TruckElectric,
  Check,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Mail,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

function CategorySelection() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: null as string | null 
  })

  const categories = [
    {
      id: 'cleaning',
      name: "Cleaning Services",
      description: "Professional cleaning for homes and businesses",
      icon: BrushCleaning,
      subServices: [
        "Power Wash",
        "Deep Cleaning",
        "Dish Washer",
        "Laundry",
        "Cleaning Assistant"
      ],
      available: true,
    },
    {
      id: 'ecom',
      name: "E-commerce",
      description: "Online retail and fulfillment operations",
      icon: ShoppingBag,
      subServices: [
        "Packaging",
        "Labeling",
        "Inventory Management",
        "Shipping/Dropping off",
        "Restocking",
        "Order Processing"
      ],
      available: true,
    },
    {
      id: 'construction',
      name: "Construction",
      description: "Building, renovation and repair work",
      icon: Drill,
      subServices: [
        "General Labor",
        "Carpentry",
        "Painting",
        "Electrical",
        "Plumbing"
      ],
      available: false,
    },
    {
      id: 'delivery',
      name: "Delivery",
      description: "Transportation and logistics services",
      icon: TruckElectric,
      subServices: [
        "Local Delivery",
        "Package Delivery",
        "Food Delivery",
        "Express Courier",
        "Bulk Delivery"
      ],
      available: false,
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

    const handleLogout = () => {
    console.log('Logging out...')
    router.push('/login')
    setShowProfileDropdown(false)
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

        <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow p-2 pr-4"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
              {userData.avatarUrl ? (
                <img 
                  src={userData.avatarUrl} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <span className="font-medium text-gray-700 truncate max-w-[120px]">
              {userData.name.split(' ')[0]}
            </span>
            {showProfileDropdown ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0"
                onClick={() => setShowProfileDropdown(false)}
              />
              
              {/* Dropdown Content */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
                      {userData.avatarUrl ? (
                        <img 
                          src={userData.avatarUrl} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-7 h-7 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{userData.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="w-4 h-4 mr-1" />
                        <span className="truncate">{userData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

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
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                )}

                {/* Icon */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                  !isAvailable ? 'bg-gray-200' : isSelected ? 'bg-primary-100' : 'bg-gray-100'
                }`}>
                  <category.icon className={`w-8 h-8 ${
                    !isAvailable ? 'text-gray-400' : isSelected ? 'text-primary-600' : 'text-gray-600'
                  }`} />
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
              </div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors text-base"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
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
                <ChevronRight className="w-5 h-5 ml-2 inline-block" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySelection