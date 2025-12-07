import Nav from "@/components/gigbosspage/Nav"
import SideOptions from "@/components/gigbosspage/profile/SideOptions"

export default function Security() {
    return (
        <main>
            <Nav />
            <div className="flex mt-[2rem]">
                <SideOptions />
                <div>
                    Security
                </div>
            </div>
        </main>
    )
}