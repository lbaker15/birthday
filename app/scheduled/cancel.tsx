"use client";

import action from "./action";

export const Cancel = ({ arn, handle }: any) => {
	const handleClick = async (executionArn: any) => {
		const response = await fetch("/api/cancel", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ executionArn }),
		});

		const data = await response.json();
		console.log(data);
		action();
		//alert here - maybe just update the status on component (make item & this func a child component & hold status in state)
	};
	return (
		<>
			<button className="button--blue mt-2" onClick={() => handleClick(arn)}>
				Cancel
			</button>
		</>
	);
};
