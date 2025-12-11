"use client"


import SideNav from "@/components/gigbosspage/browse/SideNav";
import GigbossMap from "@/components/gigbosspage/GigbossMap";
import Nav from "@/components/gigbosspage/Nav";
import Map from "@/components/Map";


export default function Gig() {
    return (
        <main>
            <Nav />

            <div className="flex flex-col mx-23 mt-20 pt-10">
                <div className="flex mt-6">
                    <SideNav />

                    <div className="w-[75%] ">
                        <GigbossMap />
                    </div>
                </div>
            </div>
        </main>
    )
}