import AWS from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../../../models/User";
import { ConnectOptions } from "mongoose";

const uri = process.env.URI;
mongoose.connect(String(uri), {
	useUnifiedTopology: true,
} as ConnectOptions);

const saveExecutionToUser = async (user_id: any, executionArn: any) => {
	const id = new mongoose.Types.ObjectId(user_id);
	await User.updateOne(
		{ _id: id },
		{ $push: { executionArn: executionArn } },
		{ upsert: true }
	);
};

export async function POST(request: NextRequest) {
	// find user & check if have more than 3 arns

	const body = await request.json();
	const date = body.date;
	const message = body.message
		? body.message
		: "Happy Birthday! Hope you have a great day. From ";
	const subject = body.subject;
	const phone = body.phone;
	const user_id = body.user_id;
	const user = await User.findById(user_id);
	if (!user || user.executionArn.length > 1) {
		return new Response(
			JSON.stringify({
				message: "Failed to start Step Function execution",
				error: "You have reached your limit",
			}),
			{
				status: 403,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}

	const stepfunctions = new AWS.StepFunctions({
		region: "eu-west-2",
		credentials: {
			accessKeyId: String(process.env.ACCESS),
			secretAccessKey: String(process.env.SECRET),
		},
	});
	const params = {
		stateMachineArn:
			"arn:aws:states:eu-west-2:296670793626:stateMachine:MyStateMachine-u29iz1idc",
		input: JSON.stringify({ date, message, subject, phone }),
		name: String("ExecutionName" + Math.random()),
	};

	try {
		const data = await stepfunctions.startExecution(params).promise();
		//const data = {executionArn: 'arn:aws:states:eu-west-2:296670793626:stateMachine:MyStateMachine-u29iz1idc'}
		await saveExecutionToUser(user_id, data.executionArn);

		return new Response(
			JSON.stringify({
				message: "Step Function execution started successfully",
				executionArn: data.executionArn,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error: any) {
		console.error("Step Function Error:", error);
		return new Response(
			JSON.stringify({
				message: "Failed to start Step Function execution",
				error: error.message,
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
