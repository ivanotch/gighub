import Nav from "@/components/gigbosspage/Nav";
import SideOptions from "@/components/gigbosspage/profile/SideOptions";
import ReportsContent from "@/components/gigbosspage/profile/reports/ReportsContent";

export default function Reports() {
    return (
        <main>
            <Nav />
            <div className="flex mt-[2rem]">
                <SideOptions />
                <ReportsContent />
            </div>
        </main>
    )
}