"use client";
import { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Image1 from "../../images/login.jpg";

export const Login = () => {
	const router = useRouter();
	const [state, setState] = useState({ email: "", password: "" });

	const handleChange = (e: any) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit = useCallback(async () => {
		const { email, password } = state;
		if (email.length && password.length) {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (data.id) {
				document.cookie = `user_id=${data.id}; path=/; max-age=86400`;
				router.push("/dashboard");
			}
		}
	}, [state]);
	return (
		<div className="flex h-full md:flex-row flex-col">
			<div className="bg-offBlack min-h-screen px-10 py-20 flex flex-col justify-center font-workSans text-white md:w-1/2 flex flex-col gap-2">
				<h1 className="text-3xl sm:text-6xl font-light mb-10">Login below</h1>
				<label className="h-1 w-1 opacity-0 -z-10 absolute" htmlFor="email">
					email
				</label>
				<input
					id="email"
					onChange={handleChange}
					name="email"
					value={state.email}
					placeholder="Email Address"
					className="border-white text-white placeholder:text-white font-light focus:bg-transparent border-b bg-transparent mb-10"
				/>
				<label className="h-1 w-1 opacity-0 -z-10 absolute" htmlFor="password">
					password
				</label>
				<input
					id="password"
					onChange={handleChange}
					name="password"
					value={state.password}
					placeholder="Password"
					type="password"
					className="border-white text-white placeholder:text-white font-light focus:bg-transparent border-b bg-transparent mb-10"
				/>
				<button
					className="button--blue text-xl font-light rounded-full px-10"
					onClick={handleSubmit}
				>
					Sign in
				</button>
			</div>

			<div className="md:w-1/2 relative max-h-screen">
				<Image
					width={1400}
					height={1400}
					alt="decorative image"
					className="w-full h-full object-cover"
					src={Image1.src}
				/>
			</div>
		</div>
	);
};
