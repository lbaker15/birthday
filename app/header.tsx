"use client";
import Link from "next/link";
import { cookies } from "./dashboard/cookies";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
	const pathname = usePathname();
	const [id, setId] = useState(null);

	useEffect(() => {
		const id = cookies("user_id");
		setId(id);
	}, [pathname]);

	return (
		<>
			{id && (
				<header className="fixed top-0 w-full left-0 py-3 px-2">
					<div className="wrapper flex gap-4 justify-end font-workSans font-light text-white">
						<Link className="shrink-0 button--yellow" href="/dashboard">
							Dashboard
						</Link>
						<Link className="shrink-0 button--yellow" href="/scheduled">
							View All Messages
						</Link>
					</div>
				</header>
			)}
		</>
	);
};
