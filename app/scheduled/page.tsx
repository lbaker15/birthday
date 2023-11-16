import { cookies } from "next/headers";
import { Inner } from "./inner";

export default async function Page({}: any) {
	const id: any = cookies().get("user_id");
 
	const res = await fetch(`${process.env.SITE_URL}/api/get-all `, {
		method: "POST",
		body: JSON.stringify({ id: id.value }),
		cache: "no-store",
	});
	const data = await res.json();
 
	return (
		<>
			{data.user ? (
				data.user.executionArn.map(async (executionArn: any, index: number) => {
					return <Inner index={index} executionArn={executionArn} />;
				})
			) : (
				<>
					{data && !data.user ? (
						<div className="font-light text-white text-xl">
							No messages scheduled yet...
						</div>
					) : (
						<div className="font-light text-white text-xl">Loading...</div>
					)}
				</>
			)}
		</>
	);
}
