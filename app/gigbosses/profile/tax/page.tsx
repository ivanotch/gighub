import Nav from "@/components/gigbosspage/Nav"
import SideOptions from "@/components/gigbosspage/profile/SideOptions"

export default function Tax() {
    return (
        <main>
            <Nav />
            <div className="flex mt-[2rem]">
                <SideOptions />
                <div>
                    Tax
                </div>
            </div>
        </main>
    )
}