import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import MantineProvider from "@/providers/mantine";

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
});

const metadata: Metadata = {
	title: "FreeLate – La galère est réelle. L’attestation aussi.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang={"fr"}>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={`${dmSans.variable} antialiased`}>
				<MantineProvider>{children}</MantineProvider>
			</body>
		</html>
	);
};

export { metadata };
export default RootLayout;
