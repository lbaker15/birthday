"use client";
import { useCallback, useEffect, useState } from "react";
import { Create } from "./create";
import { Login } from "./login";

export default function Page() {
	const [create, setCreate] = useState(false);

	return (
		<div className="min-h-screen relative">
			<button
				className="absolute z-20 top-4 left-10 button--yellow"
				onClick={() => setCreate(!create)}
			>
				{!create ? "Create User" : "Login"}
			</button>
			{!create ? <Login /> : <Create />}
		</div>
	);
}
