'use client'

import Nav from "@/components/gigbosspage/Nav"
import SideFilter from "@/components/gigbosspage/search/SideFilter"
import MainContent from "@/components/gigbosspage/search/MainContent"
import { useState } from "react"

type Filters = {
    status: string[];
    location: string;
    category: string;
};

export default function SearchWorker() {
    const [filters, setFilters] = useState<Filters>({
        status: [],
        location: "",
        category: ""
    });

    return (
        <main>
            <Nav />
            <div className="flex flex-col mx-23 pt-10">
                <div className="flex mt-6">
                    <div className="w-[25%]">
                        <SideFilter filters={filters} setFilters={setFilters} />
                    </div>

                    <MainContent filters={filters} />
                </div>
            </div>
        </main>
    )
}
