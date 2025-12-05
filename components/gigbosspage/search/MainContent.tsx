'use client'
import { Input } from "@/components/ui/input"
import { LucideSearch, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

const defValueText = `Hello!

I'd like to invite you to take a look at the job I've posted. Please submit a proposal if you're available and interested.

- James B.`;

const workers = [
    {
        id: 1,
        avatar: "",
        name: "Sophia R.",
        title: "Cleaning | E-Commerce",
        location: "Quezon City",
        jobSuccess: "92%",
        jobCount: "48",
        tags: ["Packing", "Shipping", "Inventory Management", "Restocking", "Order Fulfillment"],
        description: "Reliable gig worker handling multiple tasks efficiently. I specialize in shipping and packing but am skilled in inventory management and restocking for e-commerce businesses.",
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
        description: "Experienced in warehouse operations and e-commerce order fulfillment. I can manage labeling, sorting, and quality checks while ensuring timely deliveries.",
        availability: "available",
        status: "top rated"
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
        description: "Efficient operations specialist for e-commerce tasks. I excel in packing and labeling while keeping inventory organized and performing audits for smooth operations.",
        availability: "unavailable",
        status: "highest success"
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
        description: "Dedicated fulfillment specialist ready to handle multiple short fulfillment tasks. Skilled in packaging, order picking, labeling, and timely delivery.",
        availability: "available",
        status: "most experienced"
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
        description: "Organized and dependable logistics coordinator. I manage packing, sorting, and stock replenishment while maintaining quality control in all e-commerce tasks.",
        availability: "unavailable",
        status: "none"
    }
];

type Filters = {
    status: string[];
    location: string;
    category: string;
};

export default function MainContent({ filters }: { filters: Filters }) {
    const [openInvite, setOpenInvite] = useState(false)
    const [inviteGig, setInviteGig] = useState("")
    const [searchText, setSearchText] = useState("");
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);

    const [selectedWorker, setSelectedWorker] = useState<any | null>(null);
    const [openSheet, setOpenSheet] = useState(false);

    const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({})


    const filteredWorkers = workers.filter(worker => {
        const matchesSearch =
            worker.name.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.title.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.location.toLowerCase().includes(searchText.toLowerCase()) ||
            worker.tags.some(tag =>
                tag.toLowerCase().includes(searchText.toLowerCase())
            );

        const matchesStatus =
            filters.status.length === 0 ||
            filters.status.includes(worker.status);

        const matchesLocation =
            !filters.location ||
            worker.location.toLowerCase().replace(/ /g, "-") === filters.location;

        const matchesCategory =
            !filters.category ||
            worker.title.toLowerCase().includes(filters.category.toLowerCase());

        const matchesAvailability =
            !showAvailableOnly || worker.availability === "available";

        return matchesSearch && matchesStatus && matchesLocation && matchesCategory && matchesAvailability;
    });

    return (
        <div className="w-[75%]">
            {/* Search Bar */}
            <div className="flex justify-between items-start gap-4">
                <div className="relative w-[80%] rounded-xl mb-3">
                    <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="py-5 pl-10 pr-5 border-black"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <Toggle
                    variant="outline"
                    className="mt-1 mr-3 border-black"
                    pressed={showAvailableOnly}
                    onPressedChange={(value) => setShowAvailableOnly(value)}
                >
                    <i className="ri-flashlight-line"></i> Available now
                </Toggle>
            </div>
            <div>
                {
                    filteredWorkers.map((worker) => {
                        const isFav = favorites[worker.id] || false;
                        return (
                            <div
                                key={worker.id}
                                onClick={(e) => {
                                    // Prevent sheet from opening when clicking Invite button
                                    const isInviteButton = (e.target as HTMLElement).closest(".invite-btn");
                                    if (isInviteButton) return;

                                    setSelectedWorker(worker);
                                    setOpenSheet(true);
                                }}
                                className="border-b-1 px-5 py-8 hover:bg-gray-200 rounded-sm cursor-pointer"
                            >
                                <div className="flex justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="relative">
                                            <Avatar className="w-16 h-16">
                                                <AvatarImage className="" src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            {worker.status !== "none" ? (
                                                worker.status === "most experienced" ? (
                                                    <i className="absolute bottom-[-1rem] right-[-0.7rem] ri-arrow-up-double-line text-pink-700 text-[1.8rem]"></i>
                                                ) : (
                                                    worker.status === "highest success" ? (
                                                        <i className="absolute bottom-[-1rem] right-[-0.7rem] ri-bookmark-3-line text-blue-600 text-[1.8rem]"></i>
                                                    ) : (
                                                        worker.status === "top rated" ? (
                                                            <i className="absolute bottom-[-1rem] right-[-0.7rem] ri-sparkling-fill text-yellow-500 text-[1.8rem]"></i>
                                                        ) : (null)
                                                    )
                                                )

                                            ) : (null)}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex gap-2 items-center">
                                                <span className="text-[1.1rem] leading-none">{worker.name}</span>
                                                {worker.availability === "available" ? (
                                                    <span className="bg-violet-200 text-violet-800 rounded-full px-2 text-[0.80rem]"><i className="ri-flashlight-line"></i> Available</span>
                                                ) : (null)}
                                            </div>
                                            <span className="text-[1.3rem] font-semibold leading-6">{worker.title}</span>
                                            <span className="text-[0.9rem] leading-none">{worker.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5">
                                        {/* Heart Toggle */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFavorites((prev) => ({
                                                    ...prev,
                                                    [worker.id]: !prev[worker.id],
                                                }))
                                            }
                                            }
                                            className="p-2 rounded-full transition"
                                        >
                                            <Heart
                                                className={`w-6 h-6 transition-all duration-200 ${isFav ? "fill-pink-500 stroke-pink-500" : "stroke-gray-600"
                                                    }`}
                                            />
                                        </button>

                                        <Button
                                            className="bg-blue-600 hover:bg-blue-500 invite-btn"
                                            onClick={() => setOpenInvite(true)}
                                        >
                                            Invite to gig
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex gap-6 py-3">
                                    <span className="text-[1rem] font-[500] text-gray-500">{worker.jobSuccess} Gig Success</span>
                                    <span className="text-[1rem] font-[500] text-gray-500">{worker.jobCount} Accomplished Gig</span>
                                </div>
                                <div className="flex gap-3 mb-3">
                                    {worker.tags.map((tag, index) => (
                                        <span className="bg-slate-200 rounded-full px-2 text-[0.89rem]" key={index}>{tag}</span>
                                    ))}
                                </div>
                                <div className="">
                                    {worker.description}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {openInvite && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white flex flex-col p-6 w-[90%] max-w-[40rem] rounded-lg shadow-xl">
                        <div className="flex w-full justify-between items-center mb-4">
                            <span className="text-[1.6rem] font-semibold">Invite to gig</span>
                            <div
                                className=""
                                onClick={() => setOpenInvite(false)}
                            >
                                <i className="ri-close-large-line"></i>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Avatar className="w-15 h-15">
                                <AvatarImage className="" src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-[1.1rem] ">Charlz Ivan B.</span>
                                <span className="text-[1rem] leading-none">Cleaning | E-Commerce</span>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-2">
                            <span>Message</span>
                            <Textarea onChange={(e) => setInviteGig(e.target.value)} value={defValueText} />
                        </div>


                        <div className="w-full flex justify-end">
                            <button
                                className="mt-5 px-4 py-2 bg-blue-600 w-[15rem] text-white rounded-md"
                                onClick={() => setOpenInvite(false)}
                            >
                                Send Gig Invite
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {openSheet && selectedWorker && (
                <div className="fixed inset-0 z-50 flex">

                    {/* Dark overlay */}
                    <div
                        className="w-[25%] bg-black/40"
                        onClick={() => setOpenSheet(false)}
                    />

                    {/* Sheet panel */}
                    <div className="w-[75%] bg-white h-full shadow-xl animate-slide-left overflow-y-auto">

                        {/* Header */}
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-2xl font-bold">{selectedWorker.name}</h2>
                            <button onClick={() => setOpenSheet(false)}>
                                <i className="ri-close-large-line text-2xl"></i>
                            </button>
                        </div>

                        {/* Worker Info */}
                        <div className="p-6 flex gap-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col gap-1">
                                <span className="text-lg font-semibold">{selectedWorker.title}</span>
                                <span className="text-gray-600">{selectedWorker.location}</span>

                                <div className="flex gap-4 mt-3">
                                    <span className="text-gray-500">{selectedWorker.jobSuccess} Gig Success</span>
                                    <span className="text-gray-500">{selectedWorker.jobCount} Completed Gigs</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-6">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {selectedWorker.tags.map((tag: any, i: number) => (
                                    <span
                                        key={i}
                                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <p className="mt-4 text-gray-700">{selectedWorker.description}</p>
                        </div>

                        {/* Sample Gig Section */}
                        <div className="mt-10 border-t p-6">
                            <h3 className="text-xl font-bold mb-4">Previous Gig</h3>

                            <div className="bg-gray-50 border p-5 rounded-xl shadow-sm">
                                <h4 className="text-lg font-semibold">E-Commerce Packing</h4>
                                <p className="text-gray-600">Category: Short Fulfillment Task</p>

                                <div className="grid grid-cols-2 gap-4 mt-5">
                                    <div>
                                        <span className="text-gray-500">Payment Type</span>
                                        <p className="font-semibold">Per Item</p>
                                    </div>

                                    <div>
                                        <span className="text-gray-500">Items</span>
                                        <p className="font-semibold">150 items</p>
                                    </div>

                                    <div>
                                        <span className="text-gray-500">Total</span>
                                        <p className="font-semibold">₱3,000</p>
                                    </div>

                                    <div>
                                        <span className="text-gray-500">Status</span>
                                        <p className="font-semibold">Upcoming</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {["Packing", "Sorting", "Quality Check"].map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}