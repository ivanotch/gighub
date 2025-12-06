"use client"
import { LucideSearch } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function MessageNav() {
    const [searchText, setSearchText] = useState("")

    const messages = [
        {
            profile: "",
            name: "Sophia Rhodes",
            message: "When can you finish the task?",
            status: "online"
        },
        {
            profile: "",
            name: "Liam Carter",
            message: "Let me know if you need help with the report.",
            status: "offline"
        },
        {
            profile: "",
            name: "Emma Sullivan",
            message: "I'll send the files in a few minutes.",
            status: "online"
        },
        {
            profile: "",
            name: "Noah Matthews",
            message: "Can we move our meeting to tomorrow?",
            status: "busy"
        },
        {
            profile: "",
            name: "Ava Henderson",
            message: "Great job on the presentation!",
            status: "online"
        },
        {
            profile: "",
            name: "Ethan Collins",
            message: "Did you already update the document?",
            status: "away"
        }
    ];

    return (
        <main className="w-[25%] ml-10 bg-gray-200 px-7 py-5 rounded-lg h-full flex flex-col">
            {/* Header */}
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

            {/* Conversations */}
            <div className="font-semibold text-gray-600 mb-3">Conversations</div>

            <div className="flex flex-col overflow-y-auto pr-2 h-[75vh]">
                {messages.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-white rounded-sm p-3 cursor-pointer hover:bg-gray-100 transition"
                    >
                        {/* Profile */}
                        <div className="relative">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <i className="ri-user-line text-2xl text-gray-600"></i>
                            </div>

                            {/* Status Dot */}
                            <span
                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white 
                                ${item.status === "online"
                                        ? "bg-green-500"
                                        : item.status === "offline"
                                            ? "bg-gray-400"
                                            : item.status === "busy"
                                                ? "bg-red-500"
                                                : "bg-yellow-400"
                                    }`}
                            ></span>
                        </div>

                        {/* Text */}
                        <div className="flex flex-col w-full overflow-hidden">
                            <span className="font-semibold text-[1.05rem]">{item.name}</span>

                            <span className="text-gray-500 text-sm truncate whitespace-nowrap overflow-hidden">
                                {item.message}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
