import { Child } from "./child";

export const Inner = async ({ executionArn, index }: any) => {
	if (executionArn) {
		const response = await fetch(`${process.env.SITE_URL}/api/describe`, {
			method: "POST",
			body: JSON.stringify({ executionArn: executionArn }),
			next: { tags: ["collection"] },
		});
		const data = await response.json();

		return (
			<>
				<Child item={data.data} index={index} />
			</>
		);
	} else {
		return <></>;
	}
};
