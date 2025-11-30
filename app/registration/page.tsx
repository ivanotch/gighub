
import Image from "next/image"
import { UserLock } from 'lucide-react';
import { UserStar } from 'lucide-react';

export default function Registration() {
    return (
        // let the user choose if gigdaddy or gigboss
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
            <div className="">
                <div className="w-[60%] mx-[auto] flex flex-col items-center mt-[6rem] gap-2">
                    <header className="text-[2rem] mb-[1rem]">Join as a client or freelancer</header>
                    <div className="flex gap-5 flex-wrap">
                        {/* Card 1 */}
                        <div className="border border-gray-400 rounded-lg p-6 flex-1 min-w-[300px] shadow-md hover:shadow-lg transition duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <UserStar className="w-8 h-8" />
                                <input type="checkbox" className="w-6 h-6 accent-blue-500" />
                            </div>

                            {/* Two-line text */}
                            <p className="text-[1.25rem] text-black">
                                I'm a GigBoss,
                            </p>
                            <p className="text-[1.25rem] text-black">
                                hiring for a task
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="border border-gray-400  rounded-lg p-6 flex-1 min-w-[300px] shadow-md hover:shadow-lg transition duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <UserLock className="w-8 h-8 " />
                                <input type="checkbox" className="w-6 h-6 accent-primary-500" />
                            </div>

                            {/* Two-line text */}
                            <p className="text-[1.25rem]">
                                I'm a GigDaddy,
                            </p>
                            <p className="text-[1.25rem]">
                                looking for a gig
                            </p>
                        </div>
                    </div>


                    <div className="flex flex-col items-center gap-3 mt-6">

                        {/* Create Account Button */}
                        <button
                            className="w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                            Create Account
                        </button>

                        {/* Login Text */}
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
    )
}