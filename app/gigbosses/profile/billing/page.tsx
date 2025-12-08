import Nav from "@/components/gigbosspage/Nav";
import SideOptions from "@/components/gigbosspage/profile/SideOptions";
import BillingContent from "@/components/gigbosspage/profile/billing/BillingContent";

export default function Billing() {
    return (
        <main>
            <Nav />
            <div className="flex mt-[2rem]">
                <SideOptions />
                <BillingContent />
            </div>
        </main>
    )
}