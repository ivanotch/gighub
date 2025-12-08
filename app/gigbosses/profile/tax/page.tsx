import Nav from "@/components/gigbosspage/Nav";
import SideOptions from "@/components/gigbosspage/profile/SideOptions";
import TaxContent from "@/components/gigbosspage/profile/tax/TaxContent";

export default function Tax() {
    return (
        <main>
            <Nav />
            <div className="flex mt-[2rem]">
                <SideOptions />
                <TaxContent />
            </div>
        </main>
    )
}