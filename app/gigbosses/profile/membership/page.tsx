import Nav from "@/components/gigbosspage/Nav";
import SideOptions from "@/components/gigbosspage/profile/SideOptions";
import MembershipContent from "@/components/gigbosspage/profile/membership/MembershipContent";

export default function Membership() {
    return (
        <main>
            <Nav />
            <div className="flex mt-[2rem]">
                <SideOptions />
                <MembershipContent />
            </div>
        </main>
    )
}