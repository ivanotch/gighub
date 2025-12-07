import Nav from "@/components/gigbosspage/Nav"
import SideOptions from "@/components/gigbosspage/profile/SideOptions"

export default function Membership() {
    return (
        <main>
            <Nav />
            <div className="flex mt-[2rem]">
                <SideOptions />
                <div>
                    Membership
                </div>
            </div>
        </main>
    )
}