"use client"
import { LucideSearch } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface MessageContact {
  profile: string;
  name: string;
  message: string;
  status: "online" | "offline";
  location: string;
}

export default function MessageNav({ onSelectContact }: { onSelectContact: (contact: MessageContact) => void }) {
    const [searchText, setSearchText] = useState("")
    const [selectedContact, setSelectedContact] = useState<number | null>(null)

    const messages: MessageContact[] = [
        {
            profile: "",
            name: "Sophia Rhodes",
            message: "When can you finish the task?",
            status: "online",
            location: "Manila"
        },
        {
            profile: "",
            name: "Liam Carter",
            message: "Let me know if you need help with the report.",
            status: "offline",
            location: "Cebu"
        },
        {
            profile: "",
            name: "Emma Sullivan",
            message: "I'll send the files in a few minutes.",
            status: "online",
            location: "Makati"
        },
        {
            profile: "",
            name: "Noah Matthews",
            message: "Can we move our meeting to tomorrow?",
            status: "offline",
            location: "Quezon City"
        },
        {
            profile: "",
            name: "Ava Henderson",
            message: "Great job on the presentation!",
            status: "online",
            location: "Taguig"
        },
        {
            profile: "",
            name: "Ethan Collins",
            message: "Did you already update the document?",
            status: "offline",
            location: "Pasig"
        }
    ];

    const filteredMessages = messages.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleContactClick = (contact: MessageContact, index: number) => {
        setSelectedContact(index);
        if (onSelectContact) {
            onSelectContact(contact);
        }
    };

    return (
        <main className="w-[25%] ml-10 bg-gray-100 px-7 py-5 rounded-lg h-full flex flex-col">
            {/* Header - Sticky */}
            <div className="sticky top-0 bg-gray-100 pt-5 pb-3 z-10">
                <div className="flex justify-between mb-3">
                    <span className="text-[2rem] font-semibold">Messages</span>
                    <i className="ri-more-fill text-[2rem]"></i>
                </div>

                {/* Search */}
                <div className="relative rounded-xl mb-3 gap-3 flex justify-between items-center">
                    <div className="w-full">
                        <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="py-5 pl-10 pr-5 border-black w-full"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <span><i className="text-[1.6rem] ri-equalizer-3-fill"></i></span>
                </div>

                <div className="font-semibold text-gray-600">Conversations</div>
            </div>

            {/* Scrollable Contacts List */}
            <div className="flex-1 overflow-y-auto pr-2 mt-2">
                {filteredMessages.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleContactClick(item, index)}
                        className={`flex items-center gap-4 rounded-sm p-3 cursor-pointer transition mb-1 ${
                            selectedContact === index 
                                ? "bg-white border-l-4 border-l-blue-500" 
                                : "hover:bg-white"
                        }`}
                    >
                        {/* Profile */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <i className="ri-user-line text-2xl text-gray-600"></i>
                            </div>

                            {/* Status Dot - Only shows for online */}
                            {item.status === "online" && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            )}
                        </div>

                        {/* Text */}
                        <div className="flex flex-col w-full overflow-hidden min-w-0">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-[1.05rem] truncate">{item.name}</span>
                                <span className="text-xs text-gray-400">10:30 AM</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500 text-xs truncate">
                                    {item.location}
                                </span>
                            </div>
                            
                            <span className="text-gray-500 text-sm truncate whitespace-nowrap overflow-hidden mt-1">
                                {item.message}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}