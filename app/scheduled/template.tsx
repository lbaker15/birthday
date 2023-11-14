export default async function Template({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div className="bg-offBlack min-h-screen font-workSans">
				<div className="wrapper py-20">
					<h1 className="text-3xl sm:text-6xl mb-10 text-white font-light">
						All Scheduled Messages
					</h1>
					{children}
				</div>
			</div>
		</section>
	);
}
