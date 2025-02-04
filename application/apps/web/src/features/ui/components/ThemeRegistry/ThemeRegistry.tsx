import "@mui/material-pigment-css/styles.css";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Roboto } from "next/font/google";

export const font = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-family",
});

export function ThemeRegistry() {
	return (
		<>
			<InitColorSchemeScript attribute="class" />
			<CssBaseline />
		</>
	);
}
