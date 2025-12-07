"use client";
import { useRouter, usePathname } from "next/navigation";

export default function SideOptions() {
    const router = useRouter();
    const pathname = usePathname();

    const items = [
        { label: "Profile", path: "/gigbosses/profile" },
        { label: "Billing & Payment", path: "/gigbosses/profile/billing" },
        { label: "Password & Security", path: "/gigbosses/profile/security" },
        { label: "Membership", path: "/gigbosses/profile/membership" },
        { label: "Tax Information", path: "/gigbosses/profile/tax" },
        { label: "Report Updates", path: "/gigbosses/profile/reports" },
    ];

    return (
        <main className="w-[25%] ml-[5rem]">
            <header className="text-[2rem] font-semibold mb-4">Settings</header>
            <ul className="flex border-l flex-col gap-4 mr-15">
                {items.map((item) => (
                    <li
                        key={item.path}
                        onClick={() => router.push(item.path)}
                        className={`${pathname === item.path ? "p-1 text-black border-black border-l-3" : "text-gray-600"} pl-4 border-l font-semibold cursor-pointer hover:text-black`}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </main>
    );
}
