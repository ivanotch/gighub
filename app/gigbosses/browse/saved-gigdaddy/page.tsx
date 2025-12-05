'use client'
import SideNav from "@/components/gigbosspage/browse/SideNav";
import Nav from "@/components/gigbosspage/Nav";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type Worker = {
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
    workingOn: string;
    historyStatus: string;
};

type CompletedGig = {
    title: string;
    description: string;
    deadline: string;
    reward: string;
};

const sampleCompletedGigs: CompletedGig[] = [
    {
        title: "Pack 50 E-Commerce Orders",
        description: "Organize, pack, and label 50 medium-sized orders for shipment this week.",
        deadline: "Dec 10, 2025",
        reward: "₱2,500",
    },
    {
        title: "Label 100 Items for Shipment",
        description: "Ensure all items are correctly labeled and ready for delivery.",
        deadline: "Nov 25, 2025",
        reward: "₱1,800",
    },
    {
        title: "Inventory Audit of Warehouse",
        description: "Perform full inventory audit and update stock records accurately.",
        deadline: "Nov 30, 2025",
        reward: "₱2,200",
    }
];
const workers: Worker[] = [
    { id: 1, avatar: "", name: "Sophia R.", title: "Cleaning | E-Commerce", location: "Quezon City", jobSuccess: "92%", jobCount: "48", tags: ["Packing", "Shipping", "Inventory Management", "Restocking", "Order Fulfillment"], description: "Reliable gig worker handling multiple tasks efficiently.", availability: "working", status: "highest success", workingOn: "Pack 30 Medium sized orders", historyStatus: "Cancelled" },
    { id: 2, avatar: "", name: "Daniel M.", title: "E-Commerce | Digital Tasks", location: "Makati", jobSuccess: "85%", jobCount: "60", tags: ["Labeling", "Sorting", "Inventory Tracking", "Quality Check", "Delivery"], description: "Experienced in warehouse operations and e-commerce order fulfillment.", availability: "working", status: "top rated", workingOn: "Manage Inventory", historyStatus: "completed" },
    { id: 3, avatar: "", name: "Ava L.", title: "Cleaning | Digital Tasks", location: "Pasig", jobSuccess: "90%", jobCount: "52", tags: ["Packing", "Labeling", "Inventory Audit", "Restocking", "Shipping"], description: "Efficient operations specialist for e-commerce tasks.", availability: "working", status: "highest success", workingOn: "Label and Pack 100 Items for shipping", historyStatus: "completed" },
    { id: 4, avatar: "", name: "Ethan C.", title: "Delivery | E-Commerce", location: "Taguig", jobSuccess: "88%", jobCount: "41", tags: ["Order Picking", "Packaging", "Labeling", "Inventory Management", "Delivery"], description: "Dedicated fulfillment specialist ready to handle multiple short fulfillment tasks.", availability: "working", status: "most experienced", workingOn: "Manage Order Processing", historyStatus: "Cancelled" },
    { id: 5, avatar: "", name: "Isabella P.", title: "Digital Tasks | E-Commerce", location: "Mandaluyong", jobSuccess: "95%", jobCount: "70", tags: ["Packing", "Sorting", "Stock Replenishment", "Shipping", "Quality Control"], description: "Organized and dependable logistics coordinator.", availability: "working", status: "none", workingOn: "Pack and Label 34 large items for shipping", historyStatus: "completed" }
];

export default function SavedGigDaddy() {
    const router = useRouter();
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

    const [openInvite, setOpenInvite] = useState(false);
    const [inviteWorker, setInviteWorker] = useState<Worker | null>(null);
    const [inviteGig, setInviteGig] = useState("");

    const [showReportPopup, setShowReportPopup] = useState(false);
    const [reportWorker, setReportWorker] = useState<Worker | null>(null);

    const [bookmarks, setBookmarks] = useState<{ [id: number]: boolean }>(
        Object.fromEntries(workers.map((w) => [w.id, true]))
    );
    const defValueText = inviteGig;

    const toggleBookmark = (id: number) => {
        setBookmarks(prev => ({
            ...prev,
            [id]: !prev[id],    // toggle only this worker
        }));
    };

    return (
        <main>
            <Nav />
            <div className="flex flex-col mx-23 pt-10">
                <div className="flex mt-6">
                    <SideNav />
                    <div className="w-[75%]">
                        {/* Header */}
                        <div className="pl-2 flex justify-between items-center">
                            <div>
                                <div className="text-[1.5rem] font-semibold leading-none">Saved GigDaddy</div>
                                <p className="text-[1.1rem] text-gray-500">Look up people you recently worked with</p>
                            </div>
                            <Button onClick={() => router.push('/gigbosses/search')} className="bg-blue-600 hover:bg-blue-200 hover:text-black hover:border hover:border-blue-600">
                                <i className="ri-search-ai-line"></i> Look for more
                            </Button>
                        </div>

                        {/* Worker Grid */}
                        <div className="grid grid-cols-1 gap-6 my-6">
                            {workers.length > 0 ? workers.map((worker) => (
                                <div
                                    key={worker.id}
                                    onClick={() => setSelectedWorker(worker)}
                                    className="border p-5 rounded-xl shadow-sm hover:shadow-md transition bg-white cursor-pointer"
                                >
                                    {/* Top section */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                            {worker.avatar ? (
                                                <img src={worker.avatar} className="w-full h-full rounded-full" />
                                            ) : (
                                                <span className="text-gray-500">No Img</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold">{worker.name}</h2>
                                            <p className="text-sm text-gray-500">{worker.title}</p>
                                            <p className="text-sm text-gray-400">{worker.location}</p>
                                        </div>
                                        {worker.status !== "none" && (
                                            <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full capitalize">
                                                {worker.status}
                                            </span>
                                        )}
                                        <div className="flex gap-4">
                                            <i
                                                className={`text-[1.4rem] cursor-pointer transition ${bookmarks[worker.id] ? "ri-bookmark-fill text-blue-600" : "ri-bookmark-line text-gray-500"}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleBookmark(worker.id);
                                                }}
                                            ></i>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 mt-4 text-sm text-gray-700">
                                        <p><span className="font-semibold">{worker.jobSuccess}</span> job success</p>
                                        <p><span className="font-semibold">{worker.jobCount}</span> jobs</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {worker.tags.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600 mt-4">
                                            {worker.description}
                                        </p>
                                        <button
                                            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            onClick={(e) => {
                                                e.stopPropagation();             // prevent opening the details slide-over
                                                setInviteWorker(worker);         // save selected worker
                                                setOpenInvite(true);             // open popup
                                                setInviteGig(`Hi ${worker.name}, I’d like to invite you to a gig.`); // default message
                                            }}
                                        >
                                            Invite
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-500 mt-4">No workers found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide-over Panel */}
            {selectedWorker && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        onClick={() => setSelectedWorker(null)}
                    />
                    <div className="fixed top-0 right-0 h-full w-[75%] bg-white shadow-2xl border-l transform transition-transform duration-300 z-50 translate-x-0">
                        <div className="flex items-center justify-between p-5 border-b">
                            <h2 className="text-xl font-semibold">Worker & Completed Gigs</h2>
                            <button onClick={() => setSelectedWorker(null)} className="text-gray-500 hover:text-black text-xl">&times;</button>
                        </div>
                        <div className="p-5 overflow-y-auto h-full">
                            {/* Worker Info */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                    {selectedWorker.avatar ? <img src={selectedWorker.avatar} className="w-full h-full rounded-full" /> : <span className="text-gray-500">No Img</span>}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{selectedWorker.name}</h3>
                                    <p className="text-gray-500">{selectedWorker.title}</p>
                                    <p className="text-gray-400">{selectedWorker.location}</p>
                                </div>
                            </div>

                            {/* Worker Skills & Stats */}
                            <div className="mt-2 mb-5">
                                <p className="font-semibold mb-2">Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedWorker.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-2 flex gap-6 mb-5">
                                <div>
                                    <p className="text-lg font-bold">{selectedWorker.jobSuccess}</p>
                                    <p className="text-sm text-gray-500">Job Success</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">{selectedWorker.jobCount}</p>
                                    <p className="text-sm text-gray-500">Jobs Completed</p>
                                </div>
                            </div>

                            {/* Completed Gigs */}
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-3">Completed Gigs</h4>
                                <div className="flex flex-col gap-4">
                                    {sampleCompletedGigs.map((gig, i) => (
                                        <div key={i} className="p-4 border rounded-lg bg-gray-50">
                                            <h5 className="font-semibold">{gig.title}</h5>
                                            <p className="text-gray-600 mt-1">{gig.description}</p>
                                            <div className="flex justify-between mt-2 text-sm text-gray-500">
                                                <span>Deadline: {gig.deadline}</span>
                                                <span>Reward: {gig.reward}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {openInvite && inviteWorker && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div
                        className="bg-white flex flex-col p-6 w-[90%] max-w-[40rem] rounded-lg shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex w-full justify-between items-center mb-4">
                            <span className="text-[1.6rem] font-semibold">Invite to gig</span>
                            <div onClick={() => setOpenInvite(false)}>
                                <i className="ri-close-large-line"></i>
                            </div>
                        </div>

                        {/* Worker Info */}
                        <div className="flex gap-4">
                            <img
                                src={inviteWorker.avatar || "https://github.com/shadcn.png"}
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="flex flex-col">
                                <span className="text-[1.1rem]">{inviteWorker.name}</span>
                                <span className="text-[1rem] leading-none">{inviteWorker.title}</span>
                            </div>
                        </div>

                        {/* Message Box */}
                        <div className="mt-5 flex flex-col gap-2">
                            <span>Message</span>
                            <Textarea
                                onChange={(e) => setInviteGig(e.target.value)}
                                value={inviteGig}
                            />
                        </div>

                        {/* Send Button */}
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
        </main>
    );
}
