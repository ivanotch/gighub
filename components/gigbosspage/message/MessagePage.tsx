"use client"
import { useState, useRef, useEffect } from "react"

interface Message {
    id: number;
    from: "me" | "them";
    text: string;
    time: string;
    read: boolean;
}

interface Contact {
    profile: string;
    name: string;
    status: "online" | "offline";
    location: string;
}

export default function MessagePage({ contact }: { contact: Contact | null }) {
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, from: "them", text: "Hi! How's the project going?", time: "10:15 AM", read: true },
        { id: 2, from: "me", text: "Almost done! Just finishing the UI.", time: "10:16 AM", read: true },
        { id: 3, from: "them", text: "Nice! Can you send the update later?", time: "10:20 AM", read: true },
        { id: 4, from: "me", text: "Yes, I'll send it before 5 PM.", time: "10:22 AM", read: true },
        { id: 5, from: "them", text: "Thanks! Appreciate it 😊", time: "10:25 AM", read: false },
    ])
    
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return
        
        const newMsg: Message = {
            id: messages.length + 1,
            from: "me",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        }
        
        setMessages([...messages, newMsg])
        setNewMessage("")
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
        }
    }, [messages])

    if (!contact) {
        return (
            <main className="w-[75%] bg-white rounded-lg h-full flex flex-col mr-5 border">
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <i className="ri-chat-3-line text-3xl text-gray-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No Conversation Selected</h3>
                    <p className="text-center max-w-md">Select a conversation from the list to start messaging</p>
                </div>
            </main>
        )
    }

    return (
        <main className="w-[75%] bg-white rounded-lg h-full flex flex-col mr-5 border">
            {/* ---------------- Header  ---------------- */}
            <div className="sticky top-0 z-10 bg-white border-b px-5 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
                                <i className="ri-user-line text-3xl text-gray-600"></i>
                            </div>

                            {/* Status Dot */}
                            {contact.status === "online" && (
                                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xl font-semibold">{contact.name}</span>
                            <div className="flex items-center gap-2 text-sm">
                                <span className={`font-medium ${
                                    contact.status === "online" ? "text-green-600" : "text-gray-500"
                                }`}>
                                    {contact.status === "online" ? "Online" : "Offline"}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-500">{contact.location}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-5">
                        <i className="text-[1.7rem] ri-phone-line cursor-pointer hover:text-blue-600"></i>
                        <i className="text-[1.7rem] ri-error-warning-fill cursor-pointer hover:text-blue-600"></i>
                        <i className="text-[1.7rem] ri-more-2-fill cursor-pointer hover:text-blue-600"></i>
                    </div>
                </div>
            </div>

            {/* ---------------- Messages Area ---------------- */}
            <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50"
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`px-4 py-3 max-w-[70%] rounded-2xl text-sm shadow-sm relative ${
                                msg.from === "me"
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-white border border-gray-200 rounded-bl-none"
                            }`}
                        >
                            <div className="text-sm mb-1">{msg.text}</div>
                            <div className={`flex justify-end items-center gap-1 text-xs ${
                                msg.from === "me" ? "text-blue-200" : "text-gray-500"
                            }`}>
                                <span>{msg.time}</span>
                                {msg.from === "me" && (
                                    <i className={`ri-check-double-line ${msg.read ? 'text-blue-300' : 'text-gray-300'}`}></i>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* ---------------- Input Bar ---------------- */}
            <div className="sticky bottom-0 bg-white border-t p-4">
                <div className="flex items-center gap-3">
                    <i className="text-[1.7rem] ri-image-add-line cursor-pointer hover:text-blue-600"></i>
                    <i className="text-[1.7rem] ri-attachment-line cursor-pointer hover:text-blue-600"></i>
                    
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 py-3 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    <button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className={`p-3 rounded-full ${
                            newMessage.trim()
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <i className="ri-send-plane-2-fill text-xl"></i>
                    </button>
                </div>
                
                <div className="flex justify-between mt-2 px-2">
                    <div className="text-xs text-gray-500">
                        <i className="ri-lock-line mr-1"></i>
                        Messages are encrypted
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500">
                        <button className="hover:text-blue-600">Add payment</button>
                        <button className="hover:text-blue-600">Share location</button>
                    </div>
                </div>
            </div>
        </main>
    );
}