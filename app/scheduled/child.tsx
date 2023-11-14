import { Cancel } from "./cancel";

export const Child = ({ item, index }: any) => {
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
				<span className="font-medium">Message scheduled to send at:</span>{" "}
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
			{item.status === "RUNNING" && <Cancel arn={item.executionArn} />}
		</div>
	);
};
