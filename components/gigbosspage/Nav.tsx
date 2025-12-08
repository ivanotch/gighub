'use client'
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    SearchIcon,
    CircleUser,
    Bell,
} from "lucide-react"
import { useState, useEffect, useRef } from 'react'

export default function Nav() {
    const router = useRouter();
    const [openNotif, setOpenNotif] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const notifRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(e: any) {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setOpenNotif(false)
            }
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setOpenProfile(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <nav className="bg-white fixed top-0 md:top-0 z-50 w-full">
            <div className="">
                <div className="flex items-center justify-between md:justify-between w-full h-16 md:h-20 px-4 md:px-10">
                    {/* left Side */}
                    <div className="flex gap-8">
                        <div className="shrink-0 flex items-center">
                            <Link href="/gigbosses">
                                <Image src="/gigdaddy-logo.png" alt="GigDaddy Logo" height={120} width={120} className="md:h-[150px] md:w-[150px]" />
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <button onClick={() => router.push('/gigbosses')} className="underline-hover">Home</button>
                            <button onClick={() => router.push('/gigbosses/browse')} className="underline-hover">Manage Gig</button>
                            <button className="underline-hover">Manage Earnings</button>
                            <button onClick={() => router.push('/gigbosses/profile')}className="underline-hover">Profile</button>
                            <button onClick={() => router.push('/gigbosses/messages')} className="underline-hover">Messages</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 relative">

                        {/* Search - Hidden on mobile */}
                        <div className="hidden md:block">
                            <InputGroup>
                                <InputGroupInput placeholder="Search..." />
                                <InputGroupAddon>
                                    <SearchIcon />
                                </InputGroupAddon>
                                <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                            </InputGroup>
                        </div>

                        <div className="md:block float-right">
                                <SearchIcon />
                        </div>

                        {/* Notification Dropdown */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => {
                                    setOpenNotif(!openNotif)
                                    setOpenProfile(false)
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <Bell />
                            </button>

                            {openNotif && (
                                <div className="absolute bottom-full md:top-full right-0 mb-2 md:mt-2 w-64 bg-white shadow-lg rounded-xl p-4 border animate-fade-in">
                                    <p className="text-sm font-semibold mb-2">Notifications</p>

                                    <div className="flex flex-col gap-3">
                                        <div className="p-2 bg-gray-50 rounded-lg border">
                                            <p className="text-xs">Your gig <span className="font-semibold">"Logo Design"</span> received a new order!</p>
                                            <p className="text-[0.7rem] text-gray-500 mt-1">5 minutes ago</p>
                                        </div>

                                        <div className="p-2 bg-gray-50 rounded-lg border">
                                            <p className="text-xs">A buyer sent you a message.</p>
                                            <p className="text-[0.7rem] text-gray-500 mt-1">1 hour ago</p>
                                        </div>
                                    </div>

                                    <button className="text-xs text-blue-600 mt-3 hover:underline">View All</button>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => {
                                    setOpenProfile(!openProfile)
                                    setOpenNotif(false)
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <CircleUser />
                            </button>

                            {openProfile && (
                                <div className="absolute bottom-full md:top-full right-0 mb-2 md:mt-2 w-48 bg-white shadow-lg rounded-xl p-3 border animate-fade-in">
                                    <div className="flex flex-col text-sm">

                                        <button className="text-left py-2 px-2 rounded hover:bg-gray-100">Manage Profile</button>
                                        <button className="text-left py-2 px-2 rounded hover:bg-gray-100">Settings</button>
                                        <button className="text-left py-2 px-2 rounded hover:bg-gray-100">Dashboard</button>
                                        <button className="text-left py-2 px-2 rounded hover:bg-gray-100">My Gigs</button>

                                        <div className="border-t my-2"></div>

                                        <button className="text-left py-2 px-2 text-red-600 hover:bg-red-50 rounded">Logout</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}