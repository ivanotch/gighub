
"use client";

import React, { useState } from "react";
import Button from "../../components/landingpage/Button";
import Input from "../../components/landingpage/Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { rocaTwo } from "../fonts";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) {
			setError("Please enter both email and password.");
			return;
		}
		// Simulate login success
		router.push("/");
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

				<div className="w-[90%] mx-auto flex flex-col  items-center mt-[6rem] gap-2">
					<header className={`${rocaTwo.className} text-[2rem] font-bold text-primary-900`}>
						Welcome back!
					</header>
                    <h2 className="text-gray-600">Login to your account</h2>
					<form onSubmit={handleLogin} className="w-full max-w-md bg-white border border-gray-400 rounded-lg shadow-md p-8 flex flex-col gap-6">
						<Input
							label="Email"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={setEmail}
							required
							icon={<i className="ri-mail-line text-lg text-gray-400"></i>}
						/>
						<Input
							label="Password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={setPassword}
							required
							icon={<i className="ri-lock-line text-lg text-gray-400"></i>}
						/>
						{error && <div className="text-red-500 text-sm mb-2">{error}</div>}
						<Button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors duration-200">Login</Button>
                    {/* Social Login Buttons */}
					<div className="flex justify-center gap-4 w-full mb-2">
						{/* Apple Button */}
						<div className="flex items-center gap-3 border border-gray-400 rounded-full px-8 py-2 cursor-pointer hover:bg-gray-50 transition" onClick={() => alert('Apple sign-in not implemented')}>
							<img src="/apple.png" alt="apple logo" width={24} height={24} className="rounded" />
							<span className="text-gray-800 font-medium">Apple</span>
						</div>
						{/* Google Button */}
						<div className="flex items-center gap-3 border border-gray-400 rounded-full px-8 py-2 cursor-pointer hover:bg-gray-50 transition" onClick={() => alert('Google sign-in not implemented')}>
							<img src="/google.png" alt="google logo" width={24} height={24} className="rounded" />
							<span className="text-gray-800 font-medium">Google</span>
						</div>
					</div>
					</form>
					<div className="mt-6 text-center text-sm text-gray-600">
						Don't have an account?{' '}
						<Link href="/registration" className="text-primary-600 font-medium hover:underline">Sign up</Link>
					</div>
				</div>
		</main>
	);
}
