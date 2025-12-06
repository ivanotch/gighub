"use client";

import Image from "next/image";
import { Star, BriefcaseBusiness } from "lucide-react";
import { useState } from "react";
import { rocaTwo } from "../fonts";
import { useRouter } from "next/navigation";


export default function Registration() {
    const [role, setRole] = useState<"gigboss" | "gigdaddy" | null>(null);
    const router = useRouter();

    const handleSubmit = () => {
        if (role === "gigboss") {
            router.push("/registration/employer");
        } else if (role === "gigdaddy") {
            router.push("/registration/employee");
        } else {
            alert("Please select a role first.");
        }
    };

    return (
        <main>
            <nav className="w-full bg-white flex items-center h-[5rem] justify-between px-6 py-3">
                <div className="flex shrink-0 items-center">
                    <Image
                        src="/gigdaddy-logo.png"
                        alt="Logo"
                        width={170}
                        height={170}
                        className="object-contain"
                    />
                </div>
            </nav>

            <div>
                <div className="w-[60%] mx-auto flex flex-col items-center mt-[6rem] gap-2">
                    <header className={`text-[3rem] mb-[1rem] ${rocaTwo.className}`}>
                       What are you looking for?
                    </header>

                    <div className="flex gap-5 flex-wrap">
                        {/* Card 1 - GigBoss */}
                         <div
                            className="border border-gray-400 rounded-lg p-6 flex-1 min-w-[300px] shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                            onClick={() => setRole("gigdaddy")}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <BriefcaseBusiness className="w-8 h-8" />
                                <input
                                    type="checkbox"
                                    checked={role === "gigdaddy"}
                                    readOnly
                                    className="w-6 h-6 accent-primary-500 cursor-pointer"
                                />
                            </div>
                            <p className="text-[1.25rem]">I'm looking for a gig</p>
                        </div>

                        {/* Card 2 - GigBoss */}
                        <div
                            className="border border-gray-400 rounded-lg p-6 flex-1 min-w-[300px] shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                            onClick={() => setRole("gigboss")}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <Star className="w-8 h-8" />
                                <input
                                    type="checkbox"
                                    checked={role === "gigboss"}
                                    readOnly
                                    className="w-6 h-6 accent-primary-500 cursor-pointer"
                                />
                            </div>
                            <p className="text-[1.25rem] text-black">I'm hiring for a task</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 mt-6">
                        {
                            role === null ? (
                                <button
                                    disabled
                                    className="w-full max-w-xs bg-primary-200 text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200"
                                >
                                    Create Account
                                </button>
                            ) : (
                                role === "gigboss" ? (
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full max-w-xs bg-primary-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200"
                                    >
                                        Join as a GigBoss
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full max-w-xs bg-primary-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200"
                                    >
                                        Join as a GigDaddy
                                    </button>
                                )
                            )
                        }

                        <p className="text-gray-700 text-sm">
                            Already have an account?{" "}
                            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                                Log in
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
