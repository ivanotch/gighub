"use client"

import { useRouter } from "next/navigation";
import Nav from "@/components/gigbosspage/Nav";
import SideNav from "@/components/gigbosspage/browse/SideNav";
import { Button } from "@/components/ui/button";

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
        gigStatus: "completed",
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
        gigStatus: "completed",
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
        gigStatus: "cancelled",
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
        gigStatus: "completed",
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
        gigStatus: "cancelled",
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
        gigStatus: "completed",
        workersId: 1,
    },
];


export default function GigHistory() {
    const router = useRouter();

    return (
        <main>
            <Nav />
            <div className="flex flex-col mx-23 pt-10">
                <div className="flex mt-6">
                    <SideNav />
                    <div className="w-[75%]">
                        {/* Header */}
                        <div className="pl-2 flex justify-between items-center mb-6">
                            <div>
                                <div className="text-[1.5rem] font-semibold leading-none">Gig History</div>
                                <p className="text-[1.1rem] text-gray-500">Look up people you recently worked with</p>
                            </div>
                            <Button
                                onClick={() => router.push('/gigbosses/postgig')}
                                className="bg-blue-600 hover:bg-blue-200 hover:text-black hover:border hover:border-blue-600"
                            >
                                <i className="ri-add-large-line"></i> Post a gig
                            </Button>
                        </div>

                        {/* Gig Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-7">
                            {gigs.map((gig) => {
                                const worker = workers.find(w => w.id === gig.workersId);

                                return (
                                    <div
                                        key={gig.id}
                                        className="border p-4 rounded-xl shadow-sm hover:shadow-md transition bg-white cursor-pointer flex flex-col h-full"
                                    >
                                        {/* Gig Title + Category */}
                                        <h3 className="text-lg font-bold">{gig.title}</h3>
                                        <p className="text-sm text-gray-500">{gig.category}</p>

                                        {/* Gig Info */}
                                        <div className="mt-3 text-sm space-y-1 flex-1">
                                            <p><span className="font-semibold">Payment:</span> {gig.paymentType} {gig.items ? `(${gig.items} items)` : ""}</p>
                                            <p><span className="font-semibold">Total:</span> ₱{gig.total}</p>
                                            <p><span className="font-semibold">Size:</span> {gig.size}</p>
                                            <p><span className="font-semibold">Status:</span> {gig.gigStatus}</p>
                                            <p><span className="font-semibold">Repeat:</span> {gig.potentialRepeat ? "Yes" : "No"}</p>
                                        </div>

                                        {/* Worker Info */}
                                        {worker && (
                                            <div className="mt-4 p-2 bg-gray-50 rounded-lg text-sm space-y-1">
                                                <p className="font-semibold">{worker.name}</p>
                                                <p>{worker.title}</p>
                                                <p>Location: {worker.location}</p>
                                                <p>Job Success: {worker.jobSuccess}</p>
                                            </div>
                                        )}

                                        {/* Tags */}
                                        {gig.tags.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {gig.tags.map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}