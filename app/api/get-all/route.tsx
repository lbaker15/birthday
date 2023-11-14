import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../../../models/User"; // Adjust the import path as needed
import { ConnectOptions } from "mongoose";

const uri = process.env.URI;
mongoose.connect(String(uri), {
	useUnifiedTopology: true,
} as ConnectOptions);

const getUsers = async (user_id: any) => {
	const id = new mongoose.Types.ObjectId(user_id);
	return await User.findById(user_id);
};
export async function POST(request: NextRequest) {
	const body = await request.json();

	const { id } = body;
	const user = await getUsers(id);

	return new NextResponse(
		JSON.stringify({
			message: "Success",
			user,
		}),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}
