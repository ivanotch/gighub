'use client'

import SideNav from "@/components/gigbosspage/browse/SideNav";
import Nav from "@/components/gigbosspage/Nav";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Worker {
    id: number;
    avatar: string;
    name: string;
    title: string;
    location: string;
    jobSuccess: string;
    jobCount: string;
    tags: string[];
    description: string;
    availability: string;
    status: string;
}

interface Gig {
    id: number;
    type: "instant" | "scheduled";
    title: string;
    paymentType: "Per Item" | "Hourly";
    items: number | null;
    infoDesc: string;
    category: string;
    tags: string[];
    total: number;
    size: "Small" | "Medium" | "Large";
    potentialRepeat: boolean;
    gigStatus: "ongoing" | "upcoming" | "cancelled" | string;
    workersId: number;
}

const workers: Worker[] = [
    {
        id: 1,
        avatar: "",
        name: "Sophia R.",
        title: "Cleaning | E-Commerce",
        location: "Quezon City",
        jobSuccess: "92%",
        jobCount: "48",
        tags: ["Packing", "Shipping", "Inventory Management", "Restocking", "Order Fulfillment"],
        description:
            "Reliable gig worker handling multiple tasks efficiently. I specialize in shipping and packing but am skilled in inventory management and restocking for e-commerce businesses.",
        availability: "available",
        status: "highest success",
    },
    {
        id: 2,
        avatar: "",
        name: "Daniel M.",
        title: "E-Commerce | Digital Tasks",
        location: "Makati",
        jobSuccess: "85%",
        jobCount: "60",
        tags: ["Labeling", "Sorting", "Inventory Tracking", "Quality Check", "Delivery"],
        description:
            "Experienced in warehouse operations and e-commerce order fulfillment. I can manage labeling, sorting, and quality checks while ensuring timely deliveries.",
        availability: "available",
        status: "top rated",
    },
    {
        id: 3,
        avatar: "",
        name: "Ava L.",
        title: "Cleaning | Digital Tasks",
        location: "Pasig",
        jobSuccess: "90%",
        jobCount: "52",
        tags: ["Packing", "Labeling", "Inventory Audit", "Restocking", "Shipping"],
        description:
            "Efficient operations specialist for e-commerce tasks. I excel in packing and labeling while keeping inventory organized and performing audits for smooth operations.",
        availability: "unavailable",
        status: "highest success",
    },
    {
        id: 4,
        avatar: "",
        name: "Ethan C.",
        title: "Delivery | E-Commerce",
        location: "Taguig",
        jobSuccess: "88%",
        jobCount: "41",
        tags: ["Order Picking", "Packaging", "Labeling", "Inventory Management", "Delivery"],
        description:
            "Dedicated fulfillment specialist ready to handle multiple short fulfillment tasks. Skilled in packaging, order picking, labeling, and timely delivery.",
        availability: "available",
        status: "most experienced",
    },
    {
        id: 5,
        avatar: "",
        name: "Isabella P.",
        title: "Digital Tasks | E-Commerce",
        location: "Mandaluyong",
        jobSuccess: "95%",
        jobCount: "70",
        tags: ["Packing", "Sorting", "Stock Replenishment", "Shipping", "Quality Control"],
        description:
            "Organized and dependable logistics coordinator. I manage packing, sorting, and stock replenishment while maintaining quality control in all e-commerce tasks.",
        availability: "unavailable",
        status: "none",
    },
];

const gigs: Gig[] = [
    {
        id: 1,
        type: "instant",
        title: "Pack 40 Items",
        paymentType: "Per Item",
        items: 70,
        infoDesc: "no smoking",
        category: "E-Commerce",
        tags: ["Packing", "Labeling"],
        total: 400,
        size: "Large",
        potentialRepeat: true,
        gigStatus: "ongoing",
        workersId: 1,
    },
    {
        id: 2,
        type: "scheduled",
        title: "Sort Inventory Bins",
        paymentType: "Hourly",
        items: null,
        infoDesc: "handle with care",
        category: "E-Commerce",
        tags: ["Sorting", "Inventory Check"],
        total: 320,
        size: "Medium",
        potentialRepeat: false,
        gigStatus: "upcoming",
        workersId: 2,
    },
    {
        id: 3,
        type: "instant",
        title: "Clean Small Office Room",
        paymentType: "Per Item",
        items: 15,
        infoDesc: "bring your own cleaning cloth",
        category: "Cleaning",
        tags: ["Dusting", "Wiping"],
        total: 350,
        size: "Small",
        potentialRepeat: true,
        gigStatus: "ongoing",
        workersId: 3,
    },
    {
        id: 4,
        type: "scheduled",
        title: "Pack and Ship Orders",
        paymentType: "Per Item",
        items: 55,
        infoDesc: "fragile items included",
        category: "E-Commerce",
        tags: ["Packing", "Shipping"],
        total: 500,
        size: "Large",
        potentialRepeat: true,
        gigStatus: "ongoing",
        workersId: 4,
    },
    {
        id: 5,
        type: "instant",
        title: "Deep Clean Pantry",
        paymentType: "Hourly",
        items: null,
        infoDesc: "must wear gloves",
        category: "Cleaning",
        tags: ["Scrubbing", "Disinfecting"],
        total: 450,
        size: "Medium",
        potentialRepeat: false,
        gigStatus: "upcoming",
        workersId: 5,
    },
    {
        id: 6,
        type: "scheduled",
        title: "Organize Stock Room",
        paymentType: "Per Item",
        items: 30,
        infoDesc: "no food allowed inside",
        category: "E-Commerce",
        tags: ["Organizing", "Inventory Sorting"],
        total: 380,
        size: "Medium",
        potentialRepeat: true,
        gigStatus: "upcoming",
        workersId: 1,
    },
];

export default function MyGigs() {
    const router = useRouter();

    const [filter, setFilter] = useState<"all" | "ongoing" | "upcoming" | "cancelled">("all");
    const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
    const tabs = ["all", "ongoing", "upcoming"] as const;
    const [showPremiumPopup, setShowPremiumPopup] = useState(false);

    const filteredGigs = filter === "all" ? gigs : gigs.filter((gig) => gig.gigStatus === filter);

    return (
        <main>
            <Nav />

            <div className="flex flex-col mx-23 pt-10">
                <div className="flex mt-6">
                    <SideNav />

                    <div className="w-[75%]">
                        <div>
                            {/* Header */}
                            <div className="pl-2 flex justify-between items-center">
                                <div>
                                    <div className="text-[1.5rem] font-semibold leading-none">Your Gigs</div>
                                    <p className="text-[1.1rem] text-gray-500">Look up active gigs you currently have</p>
                                </div>

                                <Button
                                    onClick={() => router.push('/gigbosses/postgig')}
                                    className="bg-blue-600 hover:bg-blue-200 hover:text-black hover:border hover:border-blue-600"
                                >
                                    <i className="ri-add-large-line"></i> Post a gig
                                </Button>
                            </div>

                            {/* Filtering Tabs */}
                            <div className="mt-6 px-2">
                                <div className="flex gap-3 border-b pb-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setFilter(tab)}
                                            className={`capitalize px-4 py-2 rounded-md text-sm transition 
                                                ${filter === tab
                                                    ? "bg-blue-600 text-white shadow"
                                                    : "text-gray-600 hover:bg-gray-100"
                                                }
                                            `}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Gig Cards */}
                            <div>
                                {filteredGigs.map((gig) => (
                                    <div
                                        key={gig.id}
                                        className="border rounded-xl p-5 mt-6 shadow-sm hover:shadow-md transition bg-white"
                                    >
                                        {/* Title Row */}
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-semibold">{gig.title}</h2>
                                                <p className="text-gray-500 text-sm">{gig.category}</p>
                                            </div>

                                            <div className="flex gap-1">
                                                <span
                                                    className={`px-3 py-1 text-xs rounded-full capitalize 
                                                    ${gig.type === "instant"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {gig.type}
                                                </span>
                                                <span
                                                    className={`px-3 py-1 text-xs rounded-full capitalize 
                                                    ${gig.gigStatus === "ongoing"
                                                            ? "bg-blue-300 text-blue-700"
                                                            : gig.gigStatus === "cancelled" ? "bg-red-100 text-red-700"
                                                                : "bg-violet-100 text-violet-700"
                                                        }`}
                                                >
                                                    {gig.gigStatus}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Payment */}
                                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                            <div>
                                                <span className="text-gray-500">Payment Type</span>
                                                <p className="font-semibold">{gig.paymentType}</p>
                                            </div>

                                            <div>
                                                <span className="text-gray-500">Items</span>
                                                <p className="font-semibold">{gig.items ?? "Hourly Task"}</p>
                                            </div>

                                            <div>
                                                <span className="text-gray-500">Total</span>
                                                <p className="font-semibold">₱{gig.total}</p>
                                            </div>

                                            <div>
                                                <span className="text-gray-500">Size</span>
                                                <p className="font-semibold">{gig.size}</p>
                                            </div>

                                            <div>
                                                <span className="text-gray-500">Repeat Potential</span>
                                                <p className={`font-semibold ${gig.potentialRepeat ? "text-green-600" : "text-gray-600"}`}>
                                                    {gig.potentialRepeat ? "Yes" : "No"}
                                                </p>
                                            </div>

                                            <div>
                                                <span className="text-gray-500">Info</span>
                                                <p className="font-semibold capitalize">{gig.infoDesc}</p>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mt-5">
                                            {gig.tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-6 flex justify-end">
                                            <Button
                                                onClick={() => setSelectedGig(gig)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Right Sheet */}
            <div
                className={`
    fixed top-0 right-0 h-screen bg-white shadow-2xl border-l z-50
    transition-transform duration-300
    ${selectedGig ? "translate-x-0" : "translate-x-full"}
    w-[70%] flex flex-col
  `}
            >
                {/* Sheet Header */}
                <div className="flex items-center justify-between p-5 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold">Gig Details</h2>
                    <button
                        onClick={() => setSelectedGig(null)}
                        className="text-gray-600 hover:text-black text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Sheet Content */}
                {selectedGig && (
                    <div className="p-6 overflow-y-auto flex-1">

                        {/* Gig Info */}
                        <div>
                            <div className="flex justify-between">
                                <div className={`${selectedGig.type === "instant" ? "w-[50%]" : "w-[80%]"}`}>
                                    <h3 className="text-xl font-bold">{selectedGig.title}</h3>
                                    <p className="text-gray-600">{selectedGig.category}</p>

                                    <div className="grid grid-cols-2 gap-4 mt-5">
                                        <div>
                                            <span className="text-gray-500">Payment Type</span>
                                            <p className="font-semibold">{selectedGig.paymentType}</p>
                                        </div>

                                        <div>
                                            <span className="text-gray-500">Items</span>
                                            <p className="font-semibold">
                                                {selectedGig.items ?? "Hourly Task"}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-gray-500">Total</span>
                                            <p className="font-semibold">₱{selectedGig.total}</p>
                                        </div>

                                        <div>
                                            <span className="text-gray-500">Size</span>
                                            <p className="font-semibold">{selectedGig.size}</p>
                                        </div>

                                        <div>
                                            <span className="text-gray-500">Status</span>
                                            <p className="font-semibold">{selectedGig.gigStatus}</p>
                                        </div>

                                        <div>
                                            <span className="text-gray-500">Info</span>
                                            <p className="font-semibold capitalize">{selectedGig.infoDesc}</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    selectedGig.gigStatus === "ongoing" ? (
                                        <div className="w-[50%] h-[400px]">
                                            <iframe
                                                src="https://www.google.com/maps?q=Makati+City,+Philippines&output=embed"
                                                width="100%"
                                                height="100%"
                                                className="rounded-xl border-0"
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </div>
                                    ) : (null)
                                }
                            </div>

                            {/* Tags */}
                            <div className="flex justify-between items-center mt-6">
                                <div className="flex flex-wrap gap-2">
                                    {selectedGig.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {selectedGig.gigStatus === "ongoing" ? (
                                    <div className="flex gap-2 items-center">
                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                                        >
                                            Mark as Completed
                                        </Button>
                                        <Button
                                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                                        >
                                            Cancel Gig
                                        </Button>
                                    </div>
                                ) : (null)}
                            </div>
                        </div>

                        {/* Worker Info */}
                        <div className="mt-10 border-t pt-6">
                            <div className="flex items-center justify-between mb-2">
                                {selectedGig.gigStatus === "upcoming" ? (
                                    <h3 className="text-lg font-bold mb-2">Gigdaddy Applications</h3>
                                ) : (
                                    <h3 className="text-lg font-bold mb-2">Assigned Gigdaddy</h3>
                                )}
                                <Button
                                    onClick={() => setShowPremiumPopup(true)}
                                    className="bg-blue-600 hover:bg-blue-200 hover:text-black hover:border hover:border-blue-600"
                                >
                                    <i className="ri-add-large-line"></i> Add more gigdaddy
                                </Button>
                            </div>

                            {(() => {
                                const worker = workers.find((w) => w.id === selectedGig.workersId);

                                return worker ? (
                                    <div className="border p-4 rounded-xl shadow-sm bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-semibold text-lg">{worker.name}</h4>
                                                <p className="text-gray-500">{worker.title}</p>
                                            </div>
                                            <i className="text-[1.7rem] text-blue-700 p-1 mr-[1rem] ri-chat-ai-2-line"></i>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{worker.description}</p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {worker.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="mt-4 text-sm text-gray-500">
                                                    Location: {worker.location}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Job Success: {worker.jobSuccess}
                                                </p>
                                            </div>
                                            {
                                                selectedGig.type === "scheduled" && (
                                                    <div className="flex gap-3">
                                                        <Button
                                                            onClick={() => setShowPremiumPopup(true)}
                                                            className="bg-blue-600 hover:bg-blue-200 hover:text-black hover:border hover:border-blue-600"
                                                        >
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            onClick={() => setShowPremiumPopup(true)}
                                                            className="bg-red-600 hover:bg-red-200 hover:text-black hover:border hover:border-red-600"
                                                        >
                                                            Reject
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <p>No worker assigned.</p>
                                );
                            })()}
                        </div>

                    </div>
                )}
            </div>

            {/* Premium Upgrade Popup */}
            {showPremiumPopup && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-white/30 backdrop-blur-sm"
                    onClick={() => setShowPremiumPopup(false)}
                >
                    <div
                        className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowPremiumPopup(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                        >
                            ×
                        </button>

                        {/* Premium Badge */}
                        <div className="flex justify-center">
                            <div className="bg-blue-400 text-black font-bold px-4 py-1 rounded-full shadow">
                                PREMIUM REQUIRED
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-center mt-5">
                            Upgrade to Premium
                        </h2>

                        <p className="text-gray-600 text-center mt-2">
                            Add more GigDaddy workers and unlock full multi-worker support.
                            Manage bigger tasks and boost your productivity.
                        </p>

                        {/* Features */}
                        <div className="mt-6 space-y-2">
                            <p className="flex items-center gap-2">
                                <i className="ri-check-line text-green-600 text-xl"></i>
                                Assign multiple GigDaddies per gig
                            </p>
                            <p className="flex items-center gap-2">
                                <i className="ri-check-line text-green-600 text-xl"></i>
                                Priority search ranking
                            </p>
                            <p className="flex items-center gap-2">
                                <i className="ri-check-line text-green-600 text-xl"></i>
                                Faster worker matching
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex gap-3">
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-200 text-white hover:text-black font-semibold"
                            >
                                Upgrade Now
                            </Button>

                            <Button
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                                onClick={() => setShowPremiumPopup(false)}
                            >
                                Maybe Later
                            </Button>
                        </div>
                    </div>
                </div>
            )}



        </main>
    )
}