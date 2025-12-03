'use client'
import { Input } from "@/components/ui/input"
import { LucideSearch, HeartPlus } from "lucide-react"
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
                    filteredWorkers.map((worker) => (
                        <div key={worker.id} className="border-b-1 px-5 py-8 hover:bg-gray-200 rounded-sm">
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
                                    <HeartPlus />
                                    <Button onClick={() => setOpenInvite(true)} className="bg-blue-600 hover:bg-blue-500">
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
                    ))
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
        </div>
    )
}