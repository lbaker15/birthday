"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Image1 from "../../images/login.jpg";

export const Create = () => {
	const [alert, setAlert] = useState("");
	const [state, setState] = useState({ name: "", email: "", password: "" });
	useEffect(() => {}, []);
	const handleChange = (e: any) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit = useCallback(async () => {
		const { name, email, password } = state;
		if (name.length && email.length && password.length) {
			const response = await fetch("/api/create-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});
			const data = await response.json();
			setAlert(data.message);
		}
	}, [state]);
	return (
		<div className="flex h-full md:flex-row flex-col">
			<div className="bg-offBlack min-h-screen px-10 py-20 flex flex-col justify-center font-workSans text-white md:w-1/2 flex flex-col gap-2">
				<h1 className="text-3xl sm:text-6xl font-light mb-10">Signup below</h1>
				<label className="h-1 w-1 opacity-0 -z-10 absolute" htmlFor="name">
					name
				</label>
				<input
					id="name"
					onChange={handleChange}
					name="name"
					value={state.name}
					placeholder="Full Name"
					className="border-white text-white placeholder:text-white font-light focus:bg-transparent border-b bg-transparent mb-10"
				/>
				<label className="h-1 w-1 opacity-0 -z-10 absolute" htmlFor="email">
					email
				</label>
				<input
					id="email"
					onChange={handleChange}
					name="email"
					value={state.email}
					placeholder="Email"
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
					className="border-white text-white placeholder:text-white font-light focus:bg-transparent border-b bg-transparent mb-10"
				/>
				{alert.length ? <p className="mb-4 font-light text-xl">{alert}</p> : ""}
				<button
					className="button--blue text-xl font-light rounded-full px-10"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
			<div className="md:w-1/2 relative">
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
