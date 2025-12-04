"use client"
import { useRouter } from "next/navigation"

export default function SideNav() {
    const router = useRouter();

    return (
        <div className="w-[25%] pr-9">
            <div className="mb-10">
                <ul className="flex flex-col gap-1" >
                    <li onClick={() => router.push("/gigbosses/browse")} className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100"><i className="ri-team-line"></i> <span>Your Gigdaddy</span></li>
                    <li onClick={() => router.push("/gigbosses/browse/my-gigs")} className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100"><i className="ri-briefcase-4-line"></i> <span>Your Gigs</span></li>
                    <li onClick={() => router.push("/gigbosses/browse/recent-gigdaddy")} className="px-3 py-2 flex items-center gap-2 rounded-lg  hover:bg-gray-100"><i className="ri-user-2-line"></i> <span>Recent GigDaddy</span></li>
                    <li onClick={() => router.push("/gigbosses/browse/history")} className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100"><i className="ri-history-line"></i> <span>Gig history</span></li>
                </ul>
            </div>

            <div>
                <div className="flex justify-between p-2 leading-none items-center border-b border-black ">
                    <header className="text-[1.1rem] font-semibold">Create Collections</header>
                    <i className="ri-play-list-add-line text-[1.6rem]"></i>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                    <li className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100"><i className="ri-heart-fill"></i> <span>Saved GigDaddy</span></li>
                    <li className="px-3 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-100"><i className="ri-bookmark-fill"></i> <span>Saved Gig</span></li>
                </ul>
            </div>
        </div>
    )
}