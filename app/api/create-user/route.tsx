import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../../../models/User";
import { ConnectOptions } from "mongoose";

const uri = process.env.URI;
mongoose.connect(String(uri), {
	useUnifiedTopology: true,
} as ConnectOptions);

const createUser = async ({ email, password, name }: any) => {
	await User.create({ email, password, executionArn: [], name });
};
export async function POST(request: NextRequest) {
	const body = await request.json();
	const { email, password, name } = body;
	try {
		createUser({ email, password, name });
		return new Response(
			JSON.stringify({
				message: "User created",
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (err: any) {
		console.log(err);
		return new Response(
			JSON.stringify({
				message: "User not created",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}
