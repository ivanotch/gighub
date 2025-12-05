'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // assuming you have an Input component
import { Button } from "@/components/ui/button";

export default function SideNav() {
    const router = useRouter();
    const [openCreatePopup, setOpenCreatePopup] = useState(false);
    const [collectionName, setCollectionName] = useState("");

    const handleCreateCollection = () => {
        if (collectionName.trim() !== "") {
            console.log("New collection name:", collectionName);
            // You can call your API or state update here
            setCollectionName("");
            setOpenCreatePopup(false);
        }
    };

    return (
        <div className="w-[25%] pr-9">
            <div className="mb-10">
                <ul className="flex flex-col gap-1">
                    <li onClick={() => router.push("/gigbosses/browse")} className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100">
                        <i className="ri-team-line"></i> <span>Your Gigdaddy</span>
                    </li>
                    <li onClick={() => router.push("/gigbosses/browse/my-gigs")} className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100">
                        <i className="ri-briefcase-4-line"></i> <span>Your Gigs</span>
                    </li>
                    <li onClick={() => router.push("/gigbosses/browse/recent-gigdaddy")} className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100">
                        <i className="ri-user-2-line"></i> <span>Recent GigDaddy</span>
                    </li>
                    <li onClick={() => router.push("/gigbosses/browse/history")} className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100">
                        <i className="ri-history-line"></i> <span>Gig history</span>
                    </li>
                </ul>
            </div>

            <div>
                <div 
                    className="flex justify-between p-2 leading-none items-center border-b border-black cursor-pointer"
                    onClick={() => setOpenCreatePopup(true)}
                >
                    <header className="text-[1.1rem] font-semibold">Create Collections</header>
                    <i className="ri-play-list-add-line text-[1.6rem]"></i>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                    <li onClick={() => router.push("/gigbosses/browse/saved-gigdaddy")} className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100">
                        <i className="ri-heart-fill"></i> <span>Saved GigDaddy</span>
                    </li>
                </ul>
            </div>

            {/* Create Collection Popup */}
            {openCreatePopup && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[90%] max-w-md" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">New Collection</h2>
                            <button onClick={() => setOpenCreatePopup(false)} className="text-gray-500 hover:text-black text-xl">&times;</button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Input 
                                placeholder="Enter collection name"
                                value={collectionName}
                                onChange={(e) => setCollectionName(e.target.value)}
                            />
                            <Button onClick={handleCreateCollection} className="bg-blue-600 hover:bg-blue-700 text-white">
                                Create
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
