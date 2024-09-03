import "./globals.css";
import { Inter } from "next/font/google";
import getSettings from "@/lib/getSettings";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
	const settings = await getSettings();

	return {
		title: settings?.siteTitle,
		description: settings?.siteDescription,
		keywords: settings?.siteKeywords,
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
