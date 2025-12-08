import Nav from "@/components/gigbosspage/Nav";
import SideOptions from "@/components/gigbosspage/profile/SideOptions";
import SecurityContent from "@/components/gigbosspage/profile/security/SecurityContent";

export default function Security() {
    return (
        <main>
            <Nav />
            <div className="flex mt-[2rem]">
                <SideOptions />
                <SecurityContent />
            </div>
        </main>
    )
}