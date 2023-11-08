"use client";
import { useEffect, useState } from "react";
import { cookies } from "../dashboard/cookies";
import { redirect } from "next/navigation";

export default function Page() {
	const [arns, setArns] = useState([]);
	useEffect(() => {
		(async function () {
			const id = cookies("user_id");
			const response = await fetch("/api/get-all", {
				method: "POST",
				body: JSON.stringify({ id }),
			});
			const data = await response.json();
			if (data && data.user) {
				const arr: any = [];
				Promise.all(
					data.user.executionArn.map(async (arn: any) => {
						const response = await fetch("/api/describe", {
							method: "POST",
							body: JSON.stringify({ executionArn: arn }),
						});
						const data = await response.json();
						arr.push(data.data);
					})
				).then(() => {
					setArns(arr);
					console.log("here", arr);
				});
			}
		})();
	}, []);
	const handleClick = async (executionArn: any) => {
		console.log(executionArn);
		const response = await fetch("/api/cancel", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ executionArn }),
		});

		const data = await response.json();
		console.log(data);
		//alert here - maybe just update the status on component (make item & this func a child component & hold status in state)
	};
	const id = cookies("user_id");

	if (!id) {
		redirect("/login");
	}
	return (
		<div className="bg-offBlack min-h-screen font-workSans">
			<div className="wrapper py-20">
				<h1 className="text-3xl sm:text-6xl mb-10 text-white font-light">
					All Scheduled Messages
				</h1>
				{arns.length ? (
					arns.map((item: any, index) => {
						const input = JSON.parse(item.input);
						const time = new Date(input.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							hour12: true,
						});
						const { message, phone } = input;

						return (
							<div
								className={`mb-2 p-3 rounded-lg ${
									index % 4 === 0
										? "text-green bg-yellow"
										: index % 4 === 1
										? "bg-blue text-pink"
										: index % 4 === 2
										? "text-yellow bg-green"
										: "bg-pink text-blue"
								}`}
								key={"arn" + index}
							>
								<h2>
									<span className="font-medium">
										Message scheduled to send at:
									</span>{" "}
									{time}
								</h2>
								<p>
									<span className="font-medium">Status:</span> {item.status}
								</p>
								<p>
									<span className="font-medium">Message:</span> {message}
								</p>
								<p>
									<span className="font-medium">Phone Number:</span> {phone}
								</p>
								{item.status === "RUNNING" && (
									<button
										className="button--blue mt-2"
										onClick={() => handleClick(item.executionArn)}
									>
										Cancel
									</button>
								)}
							</div>
						);
					})
				) : (
					<div className="font-light text-white text-xl">Loading...</div>
				)}
			</div>
		</div>
	);
}
