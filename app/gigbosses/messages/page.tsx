"use client"
import { useState } from "react"
import MessageNav from "@/components/gigbosspage/message/MessageNav"
import MessagePage from "@/components/gigbosspage/message/MessagePage"
import Nav from "@/components/gigbosspage/Nav"

interface Contact {
  profile: string;
  name: string;
  message: string;
  status: "online" | "offline";
  location: string;
}

export default function Message() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

    return (
        <main className="flex flex-col h-screen">
            <Nav />
            
            <div className="flex flex-1 overflow-hidden mt-3">
                <MessageNav onSelectContact={setSelectedContact} />
                <MessagePage contact={selectedContact} />
            </div>
        </main>
    )
}