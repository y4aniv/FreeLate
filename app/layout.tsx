import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/styles/globals.css";

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
			<body className={`${dmSans.variable} antialiased`}>{children}</body>
		</html>
	);
};

export { metadata };
export default RootLayout;
