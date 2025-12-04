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

const workers: Worker[] = [
    { id: 1, avatar: "", name: "Sophia R.", title: "Cleaning | E-Commerce", location: "Quezon City", jobSuccess: "92%", jobCount: "48", tags: ["Packing", "Shipping", "Inventory Management", "Restocking", "Order Fulfillment"], description: "Reliable gig worker handling multiple tasks efficiently.", availability: "working", status: "highest success", workingOn: "Pack 30 Medium sized orders", historyStatus: "Cancelled" },
    { id: 2, avatar: "", name: "Daniel M.", title: "E-Commerce | Digital Tasks", location: "Makati", jobSuccess: "85%", jobCount: "60", tags: ["Labeling", "Sorting", "Inventory Tracking", "Quality Check", "Delivery"], description: "Experienced in warehouse operations and e-commerce order fulfillment.", availability: "working", status: "top rated", workingOn: "Manage Inventory", historyStatus: "completed" },
    { id: 3, avatar: "", name: "Ava L.", title: "Cleaning | Digital Tasks", location: "Pasig", jobSuccess: "90%", jobCount: "52", tags: ["Packing", "Labeling", "Inventory Audit", "Restocking", "Shipping"], description: "Efficient operations specialist for e-commerce tasks.", availability: "working", status: "highest success", workingOn: "Label and Pack 100 Items for shipping", historyStatus: "completed" },
    { id: 4, avatar: "", name: "Ethan C.", title: "Delivery | E-Commerce", location: "Taguig", jobSuccess: "88%", jobCount: "41", tags: ["Order Picking", "Packaging", "Labeling", "Inventory Management", "Delivery"], description: "Dedicated fulfillment specialist ready to handle multiple short fulfillment tasks.", availability: "working", status: "most experienced", workingOn: "Manage Order Processing", historyStatus: "Cancelled" },
    { id: 5, avatar: "", name: "Isabella P.", title: "Digital Tasks | E-Commerce", location: "Mandaluyong", jobSuccess: "95%", jobCount: "70", tags: ["Packing", "Sorting", "Stock Replenishment", "Shipping", "Quality Control"], description: "Organized and dependable logistics coordinator.", availability: "working", status: "none", workingOn: "Pack and Label 34 large items for shipping", historyStatus: "completed" }
];

export default function RecentGigDaddy() {
    const router = useRouter();
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
    const [filter, setFilter] = useState<"all" | "completed" | "cancelled">("all");
    const tabs = ["all", "completed", "cancelled"] as const;

    const [openInvite, setOpenInvite] = useState(false);
    const [inviteWorker, setInviteWorker] = useState<Worker | null>(null);
    const [inviteGig, setInviteGig] = useState("");

    const [showReportPopup, setShowReportPopup] = useState(false);
    const [reportWorker, setReportWorker] = useState<Worker | null>(null);

    const [bookmarks, setBookmarks] = useState<{ [id: number]: boolean }>({});
    const defValueText = inviteGig;

    const toggleBookmark = (id: number) => {
        setBookmarks(prev => ({
            ...prev,
            [id]: !prev[id],    // toggle only this worker
        }));
    };

    const filteredWorkers = workers.filter(worker => {
        if (filter === "all") return true;
        return worker.historyStatus.toLowerCase() === filter.toLowerCase();
    });

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
                                <div className="text-[1.5rem] font-semibold leading-none">Recent GigDaddy</div>
                                <p className="text-[1.1rem] text-gray-500">Look up people you recently worked with</p>
                            </div>
                            <Button onClick={() => router.push('/gigbosses/search')} className="bg-blue-600 hover:bg-blue-200 hover:text-black hover:border hover:border-blue-600">
                                <i className="ri-search-ai-line"></i> Look for more
                            </Button>
                        </div>

                        {/* Tabs */}
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

                        {/* Worker Grid */}
                        <div className="grid grid-cols-1 gap-6 my-6">
                            {filteredWorkers.length > 0 ? filteredWorkers.map((worker) => (
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

                                            <i
                                                className={`text-[1.4rem] ri-spam-line cursor-pointer transition hover:text-red-600`}
                                                onClick={(e) => {
                                                    e.stopPropagation();       // prevent opening the worker panel
                                                    setReportWorker(worker);   // save which worker is being reported
                                                    setShowReportPopup(true);  // show popup
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
                                                setInviteGig(`Hi ${worker.name}, I’d like to invite you to a gig again.`); // default message
                                            }}
                                        >
                                            Invite again
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
                    <div className={`fixed top-0 right-0 h-full w-[28rem] bg-white shadow-2xl border-l transform transition-transform duration-300 z-50 translate-x-0`}>
                        <div className="flex items-center justify-between p-5 border-b">
                            <h2 className="text-xl font-semibold">Gig Worker Details</h2>
                            <button onClick={() => setSelectedWorker(null)} className="text-gray-500 hover:text-black text-xl">&times;</button>
                        </div>
                        <div className="p-5 overflow-y-auto h-full">
                            <h3 className="text-2xl font-bold">{selectedWorker.name}</h3>
                            <p className="text-gray-500">{selectedWorker.title}</p>
                            <p className="text-gray-400 mt-1">{selectedWorker.location}</p>

                            {
                                selectedWorker.historyStatus === "completed" ? (
                                    <div className="mt-6 p-4 bg-green-50 flex items-center justify-between border border-green-100 rounded-xl">
                                        <div>
                                            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Worked On</p>
                                            <p className="text-sm text-blue-900 mt-1 font-medium">{selectedWorker.workingOn}</p>
                                        </div>
                                        <div className="rounded-md bg-green-800">
                                            <i className="ri-arrow-right-double-line text-[2.5rem] text-white leading-none"></i>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6 p-4 bg-red-50 flex items-center justify-between border border-red-100 rounded-xl">
                                        <div>
                                            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">Cancelled On</p>
                                            <p className="text-sm text-blue-900 mt-1 font-medium">{selectedWorker.workingOn}</p>
                                        </div>
                                        <div className="rounded-md bg-red-800">
                                            <i className="ri-arrow-right-double-line text-[2.5rem] text-white leading-none"></i>
                                        </div>
                                    </div>
                                )
                            }

                            <p className="text-gray-700 text-sm mt-5">{selectedWorker.description}</p>

                            <div className="mt-6">
                                <p className="font-semibold mb-2">Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedWorker.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-6">
                                <div>
                                    <p className="text-lg font-bold">{selectedWorker.jobSuccess}</p>
                                    <p className="text-sm text-gray-500">Job Success</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">{selectedWorker.jobCount}</p>
                                    <p className="text-sm text-gray-500">Jobs Completed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showReportPopup && reportWorker && (
                <>
                    {/* Dim/blur background */}
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        onClick={() => setShowReportPopup(false)}
                    />

                    {/* Popup Card */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                                onClick={() => setShowReportPopup(false)}
                            >
                                ×
                            </button>

                            <h2 className="text-xl font-bold mb-2">Report Worker</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                You're reporting <span className="font-semibold">{reportWorker.name}</span>.
                            </p>

                            <label className="block text-sm font-medium mb-1">Reason</label>
                            <select className="w-full border rounded-lg p-2 mb-4">
                                <option value="">Select a reason</option>
                                <option>Inappropriate behavior</option>
                                <option>Spam / Scam</option>
                                <option>Fake information</option>
                                <option>Poor work quality</option>
                            </select>

                            <label className="block text-sm font-medium mb-1">Details</label>
                            <textarea
                                className="w-full border rounded-lg p-2 h-24 mb-4"
                                placeholder="Describe what happened..."
                            ></textarea>

                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                                Submit Report
                            </Button>
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
