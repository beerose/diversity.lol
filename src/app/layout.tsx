import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="mx-auto h-full max-w-6xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto flex h-full max-w-3xl flex-col">{children}</div>
				</div>
			</body>
		</html>
	);
}
