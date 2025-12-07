import Nav from "@/components/gigbosspage/Nav";
import MainContent from "@/components/gigbosspage/profile/MainContent";
import SideOptions from "@/components/gigbosspage/profile/SideOptions";



export default function Profile() {
    return (
        <main>
            <Nav />
            <div className="flex mt-[2rem]">
                <SideOptions />
                <MainContent />
            </div>
        </main>
    )
}