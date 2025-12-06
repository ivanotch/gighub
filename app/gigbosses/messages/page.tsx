import MessageNav from "@/components/gigbosspage/message/MessageNav"
import MessagePage from "@/components/gigbosspage/message/MessagePage"
import Nav from "@/components/gigbosspage/Nav"

export default function Message() {
    return (
        <main className="flex flex-col h-screen">
            <Nav />

            {/* Content under nav should fill remaining height */}
            <div className="flex flex-1 overflow-hidden">
                <MessageNav />
                <MessagePage />
            </div>
        </main>
    )
}