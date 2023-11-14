"use client";

import { useEffect, useState } from "react";
import EmojiInput from "./emojiInput";
import { cookies } from "./cookies";
import { redirect } from "next/navigation";
import action from "../scheduled/action";

export default function Page() {
	const [state, setState] = useState<any>({});
	const [alert, setAlert] = useState("");

	function toISODateString(dateStr: string, timeStr: string) {
		const dateTimeStr = `${dateStr}T${timeStr}:00.000Z`;
		const date = new Date(dateTimeStr);
		return date.toISOString();
	}

	const handleSubmit = async (event: any) => {
		const id = cookies("user_id");
		// const date = '2023-11-07T12:19:00.000Z';
		const dateSend = toISODateString(state.date, state.time);

		if (id) {
			const response = await fetch("/api/step", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					date: dateSend,
					user_id: id,
					message: state.text,
					subject: "",
					phone: "+447593368294",
				}),
			});

			const data = await response.json();
			if (data.executionArn) {
				setAlert("Message scheduled!");
				action();
			}
		} else {
			console.log("not logged in");
		}
	};

	const handleChange = (e: any) => {
		const { value, name } = e.target;
		setState({ ...state, [name]: value });
	};
	useEffect(() => {
		const id = cookies("user_id");
		if (!id) {
			redirect("/login");
		}
	}, []);

	return (
		<div className="bg-offBlack min-h-screen font-workSans">
			{alert.length ? (
				<div
					onClick={() => setAlert("")}
					className="fixed z-20 flex justify-center items-center top-0 left-0 w-full h-full bg-blackR-500 backdrop-blur-sm"
				>
					<div className="bg-white rounded-lg p-6 text-2xl">{alert}</div>
				</div>
			) : (
				""
			)}
			<div className="wrapper py-20 flex flex-col gap-5">
				<h1 className="text-3xl sm:text-6xl mb-10 text-white font-light">
					Schedule a birthday message below
				</h1>
				<div className="bg-blue text-pink rounded-full min-h-20 p-10 flex flex-col justify-center">
					<label htmlFor="date">Enter date message is to be sent:</label>
					<input
						className="shrink-0 bg-transparent"
						id="date"
						onChange={handleChange}
						type="date"
						name="date"
						value={state.date}
					/>
				</div>
				<div className="bg-yellow rounded-full min-h-20 p-10 flex flex-col justify-center">
					<label className="text-green" htmlFor="time">
						Enter time message is to be sent:
					</label>
					<input
						className="shrink-0 bg-transparent text-green"
						id="time"
						onChange={handleChange}
						type="time"
						name="time"
						value={state.time}
					/>
				</div>
				<EmojiInput state={state} setState={setState} />
				<button
					className="mx-auto mt-5 text-blue button--pink px-10 font-medium py-4"
					onClick={handleSubmit}
				>
					Schedule Notification
				</button>
			</div>
		</div>
	);
}
