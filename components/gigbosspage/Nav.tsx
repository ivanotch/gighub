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

export default function Nav() {
    return (
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
    )
}