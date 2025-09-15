import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import { Analytics } from "@vercel/analytics/next";
import MantineProvider from "@/providers/mantine";

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
});

const metadata: Metadata = {
	title: "FreeLate – La galère est réelle. L’attestation aussi.",
};

const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang={"fr"} suppressHydrationWarning>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={`${dmSans.variable} antialiased`}>
				<MantineProvider>
					{children}
					<Analytics />
				</MantineProvider>
			</body>
		</html>
	);
};

export { metadata, viewport };
export default RootLayout;
