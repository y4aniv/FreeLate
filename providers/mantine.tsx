import {
	type MantineThemeOverride,
	MantineProvider as MantineThemeProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/fr";

const THEME: MantineThemeOverride = {
	defaultRadius: "md",
	colors: {
		brand: [
			"#e6f4f1",
			"#e0f7f1",
			"#b3ecdd",
			"#80e0c7",
			"#4dd3b0",
			"#26c89e",
			"#00AD80",
			"#009970",
			"#007d5e",
			"#00664e",
			"#004d3a",
		],
	},
	primaryColor: "brand",
};

const MantineProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<MantineThemeProvider theme={THEME}>
			<DatesProvider settings={{ locale: "fr" }}>{children}</DatesProvider>
		</MantineThemeProvider>
	);
};

export default MantineProvider;
