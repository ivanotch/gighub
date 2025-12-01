"use client";

import { useState, useRef } from "react";

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
import { Button } from "@/components/ui/button"
import {
    SearchIcon,
    CircleUser,
    Bell,
    BadgePlus,
    Smartphone,
    LayoutGrid,
    LayoutList,
    Ellipsis,
    Axe,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
interface TreeBox {
    id: number;
    title: string;
    details: string;
}


export default function Bosses() {
    const [active, setActive] = useState<"grid" | "list">("grid");
    const containerRef = useRef<HTMLDivElement>(null);
    const gigDaddyProfile = useRef<HTMLDivElement>(null);

    const scrollAmount = 425; // adjust to your box width + gap
    const scrollAmountProfile = 426;

    const scrollLeft = () => {
        containerRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    };

    const scrollRight = () => {
        containerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const scrollProfileLeft = () => {
        gigDaddyProfile.current?.scrollBy({ left: -scrollAmountProfile, behavior: "smooth" });
    };

    const scrollProfileRight = () => {
        gigDaddyProfile.current?.scrollBy({ left: scrollAmountProfile, behavior: "smooth" });
    };

    const boxes = [
        { id: 1, title: "Cut 10 meter tree, add a website while fixing the faucet.", button: "Add Details", details: "Details" },
        { id: 2, title: "Cut 8 meter tree", button: "Add Budget", details: "Add your budget to continue" },
        { id: 3, title: "Cut 12 meter tree", button: "Add Contact", details: "Add your contact to continue" },
        { id: 4, title: "Cut 6 meter tree", button: "Add Skills", details: "Add the skills you need to continue" },
        { id: 5, title: "Cut 8 meter tree", button: "Add Details", details: "Add your gig details to continue" },
        { id: 6, title: "Cut 12 meter tree", button: "View", details: "Details" },
        { id: 7, title: "Cut 6 meter tree", button: "View", details: "Details" }, // slider triggers now
    ];

    const gigDaddy = [
        { id: 1, name: "Ivanotch Babida", location: "Manila", jobSuccess: "100%", jobs: "56", hourly: "₱70/hr", title: "Manual Labor | Knitting | Dishwasher", description: "This is a description of my profile, i do varous task with complete and trustable information using verified account information." },
        { id: 2, name: "Jay Untalan", location: "Quezon City", jobSuccess: "60%", jobs: "11", hourly: "₱50/hr", title: "Cleaning | Knitting | Dishwasher", description: "This is a description of my profile, i do varous task with complete and trustable information using verified account information." },
        { id: 3, name: "Matthew Perez", location: "San Mateo", jobSuccess: "80%", jobs: "45", hourly: "₱80/hr", title: "Construction | Knitting | Dishwasher", description: "This is a description of my profile, i do varous task with complete and trustable information using verified account information." },
        { id: 4, name: "Hans Dela cruz", location: "Marikina", jobSuccess: "60%", jobs: "63", hourly: "₱40/hr", title: "Writing Services | Knitting | Dishwasher", description: "This is a description of my profile, i do varous task with complete and trustable information using verified account information." },
        { id: 5, name: "Jojo Binay", location: "Montalban", jobSuccess: "90%", jobs: "23", hourly: "₱40/hr", title: "Baking | Knitting | Dishwasher", description: "This is a description of my profile, i do varous task with complete and trustable information using verified account information." },
        { id: 6, name: "Aquino Dela pena", location: "Manila", jobSuccess: "50%", jobs: "56", hourly: "₱73/hr", title: "Manual Labor | Knitting | Dishwasher", description: "This is a description of my profile, i do varous task with complete and trustable information using verified account information." },
        { id: 7, name: "Jermey Cruz", location: "Manila", jobSuccess: "46%", jobs: "56", hourly: "₱70/hr", title: "Manual Labor | Knitting | Dishwasher", description: "This is a description of my profile, i do varous task with complete and trustable information using verified account information." },

    ];
    return (
        <main>
            <nav className="bg-white sticky top-0 z-50">
                <div className="">
                    <div className="flex items-center justify-between w-full h-20 px-10">
                        {/* left Side */}
                        <div className="flex gap-8">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <Image src="/gigdaddy-logo.png" alt="GigDaddy Logo" height={150} width={150} />
                                </Link>
                            </div>

                            <div className="flex items-center gap-4">
                                <Select>
                                    <SelectTrigger
                                        className="w-[100px] border-0 shadow-none px-0 text-black data-[placeholder]:text-black data-[placeholder]:opacity-100"
                                    >
                                        <SelectValue placeholder="Post a gig" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Post a gig</SelectLabel>
                                            <SelectItem value="apple">Post a gig</SelectItem>
                                            <SelectItem value="banana">Gig proposal</SelectItem>
                                            <SelectItem value="blueberry">Search for a GigDaddy</SelectItem>
                                            <SelectItem value="grapes">Gigdaddy you've hired</SelectItem>
                                            <SelectItem value="pineapple">Gigdaddy you've saved</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Select>
                                    <SelectTrigger
                                        className="w-[100px] border-0 shadow-none px-0 text-black data-[placeholder]:text-black data-[placeholder]:opacity-100"
                                    >
                                        <SelectValue placeholder="Manage gig" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Manage gig</SelectLabel>
                                            <SelectItem value="apple">Your contracts</SelectItem>
                                            <SelectItem value="banana">Timesheets</SelectItem>
                                            <SelectItem value="blueberry">Work Diaries</SelectItem>
                                            <SelectItem value="grapes">Time by gig worker</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger
                                        className="w-[100px] border-0 shadow-none px-0 text-black data-[placeholder]:text-black data-[placeholder]:opacity-100"
                                    >
                                        <SelectValue placeholder="Reports" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Reports</SelectLabel>
                                            <SelectItem value="apple">Weekly financial summary</SelectItem>
                                            <SelectItem value="banana">Transaction History</SelectItem>
                                            <SelectItem value="blueberry">Spending by activity</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className="text-[0.9rem]">Messages</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <InputGroup>
                                <InputGroupInput placeholder="Search..." />
                                <InputGroupAddon>
                                    <SearchIcon />
                                </InputGroupAddon>
                                <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                            </InputGroup>
                            <div><Bell /></div>
                            <div><CircleUser /></div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="mt-3">
                <div className="flex items-center justify-between px-25">
                    <header className="text-[1.5rem] font-[500]">Welcome, Ivanotch</header>
                    <Button className="bg-primary-600 text-white w-[150px] h-[45px] text-[1.1rem] gap-2" variant="outline">
                        <BadgePlus />
                        Post a gig
                    </Button>
                </div>
            </div>

            <div className="px-25">
                <header className="text-[1.95rem] font-[400] my-[1rem]">Finish setting up to hire a GigDaddy</header>
                <div className="flex gap-4">
                    <div className="flex border-1 rounded-md p-5">
                        <div className="flex flex-col ">
                            <p className="text-slate-600 text-[0.9rem] font-[400]">Required to publish a gig</p>
                            <header className="text-[1.3rem]">Verify Phone Number</header>
                            <p className="text-[1rem]">
                                Confirm it's you, to be able to publish your first gig post.
                            </p>
                        </div>
                        <Smartphone size={50} strokeWidth={1.3} />
                    </div>
                    <div className="flex border-1 rounded-md p-5">
                        <div className="flex flex-col ">
                            <p className="text-slate-600 text-[0.9rem] font-[400]">Required to publish a gig</p>
                            <header className="text-[1.3rem]">Add a Billing Method</header>
                            <p className="text-[1rem]">
                                This can increase your hiring speed by up to 3x. There's no cost untile you hire.
                            </p>
                        </div>
                        <i className="ri-bank-card-line text-[2rem] "></i>
                    </div>
                    <div className="flex border-1 rounded-md p-5">
                        <div className="flex flex-col ">
                            <p className="text-slate-600 text-[0.9rem] font-[400]">Required to publish a gig</p>
                            <header className="text-[1.3rem]">Verify Email Address</header>
                            <p className="text-[1rem]">
                                Confirm your email, this will be used to update and notify you.
                            </p>
                        </div>
                        <i className="ri-mail-ai-line text-[2rem]"></i>
                    </div>
                </div>
            </div>

            <div className="px-25 mt-[3rem] mb-[3rem]">
                <div className="flex justify-between items-center">
                    <header className="text-[1.95rem] font-[400] my-[1rem]">Overview</header>

                    {/* Tabs */}
                    <div className="flex rounded-full border border-gray-300 overflow-hidden">

                        {/* GRID TAB */}
                        <button
                            onClick={() => setActive("grid")}
                            className={`flex items-center justify-center w-10 h-10 transition ${active === "grid" ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>

                        {/* LIST TAB */}
                        <button
                            onClick={() => setActive("list")}
                            className={`flex items-center justify-center w-10 h-10 transition ${active === "list" ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            <LayoutList className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {active === "grid" ? (
                    <div className="relative">
                        {/* Left Arrow */}
                        {boxes.length > 3 && (
                            <button
                                onClick={scrollLeft}
                                className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow z-10"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}

                        {/* Boxes Container */}
                        <div
                            ref={containerRef}
                            className={`flex gap-4 overflow-hidden`}
                        >
                            {boxes.map((box) => (
                                <div
                                    key={box.id}
                                    className="w-[410px] h-[280px] flex-shrink-0 border border-slate-400 rounded-sm p-5 flex flex-col"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-primary-100 rounded-full p-3">
                                                <Axe />
                                            </div>
                                            <p className="text-[1.2rem] line-clamp-2">{box.title}</p>
                                        </div>
                                        <Ellipsis />
                                    </div>

                                    <div className="flex flex-col gap-3 h-full">
                                        <div className="flex flex-col gap-3">
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-500 text-white dark:bg-blue-600"
                                            >
                                                Draft Gig Post
                                            </Badge>

                                            <div className="mb-2 text-[1.4rem]">{box.details}</div>
                                        </div>

                                        <Button
                                            className="mt-auto border border-1 rounded-sm bg-white border-blue-700 text-primary-700 hover:bg-blue-700 hover:text-white"
                                        >
                                            {box.button}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        {boxes.length > 3 && (
                            <button
                                onClick={scrollRight}
                                className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow z-10"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                ) : (
                    <div>
                        {boxes.map((item) => (
                            <div
                                key={item.id}
                                className="border-1 rounded-xs  p-3 flex justify-between items-center gap-4"
                            >
                                {/* Left row */}
                                <div className="flex items-center w-[50%] gap-6 flex-1 min-w-0">
                                    {/* Icon + Title */}
                                    <div className="flex items-start w-[30%] gap-3 min-w-0">
                                        <div className="bg-primary-100 rounded-full p-3">
                                            <Axe />
                                        </div>
                                        <p className="text-[1.2rem] leading-snug line-clamp-2 min-w-0">
                                            {item.title}
                                        </p>
                                    </div>

                                    {/* Badge + Details */}
                                    <div className="flex items-center gap-6 flex-shrink-0">
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-500 text-white dark:bg-blue-600"
                                        >
                                            Draft Gig Post
                                        </Badge>

                                        <div className="text-[1.1rem] whitespace-nowrap">
                                            {item.details}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <Button
                                        className="mt-auto border border-1 rounded-sm bg-white border-blue-700 text-primary-700 hover:bg-blue-700 hover:text-white"
                                    >
                                        {item.button}
                                    </Button>
                                    {/* Ellipsis */}
                                    <Ellipsis />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-25 mt-[3rem] mb-[3rem]">
                <div className="flex justify-between items-center">
                    <header className="text-[1.95rem] font-[400] my-[1rem]">Book With Expert GigDaddy</header>
                    <div className="flex gap-3"><p>Browse GigDaddy</p> <ArrowRight /></div>
                </div>
                <div className="mt-[2rem]">
                    <div className="relative">
                        {/* Left Arrow */}
                        {gigDaddy.length > 3 && (
                            <button
                                onClick={scrollProfileLeft}
                                className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow z-10"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}

                        {/* Boxes Container */}
                        <div
                            ref={gigDaddyProfile}
                            className={`flex gap-4 overflow-hidden`}
                        >
                            {gigDaddy.map((box) => (
                                <div
                                    key={box.id}
                                    className="w-[304px] h-[380px] flex-shrink-0 border border-slate-400 rounded-sm p-5 flex flex-col"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex gap-5">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <p className="font-[500] text-[1.2rem]">{box.name}</p>
                                                <p>{box.location}</p>
                                            </div>
                                        </div>
                                        <i className="text-[1.5rem] ri-heart-2-line"></i>
                                    </div>

                                    <div className="flex justify-around my-[0.5rem]">
                                        <div className="flex items-center flex-col">
                                            <p className="font-[500]">{box.jobSuccess}</p>
                                            <p className="font-[500] text-[0.8rem] text-slate-700">Job Success</p>
                                        </div>
                                        <div className="flex items-center flex-col">
                                            <p className="font-[500]">{box.jobs}</p>
                                            <p className="font-[500] text-[0.8rem] text-slate-700">Jobs</p>
                                        </div>
                                        <div className="flex items-center flex-col">
                                            <p className="font-[500]">{box.hourly}</p>
                                            <p className="font-[500] text-[0.8rem] text-slate-700">Hourly Rate</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 h-full">
                                        <div className="">
                                        <p className="mb-2 text-[1.1rem]">{box.title}</p>
                                        </div>

                                        <div>
                                            {box.description}
                                        </div>

                                        <Button
                                            className="mt-auto border border-1 rounded-sm bg-white border-blue-700 text-primary-700 hover:bg-blue-700 hover:text-white"
                                        >
                                            Book a Gig
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        {boxes.length > 3 && (
                            <button
                                onClick={scrollProfileRight}
                                className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow z-10"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}