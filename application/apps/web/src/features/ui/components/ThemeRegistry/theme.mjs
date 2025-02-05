import { extendTheme } from "@mui/material";

export const theme = extendTheme({
	cssVariables: true,
	typography: {
		h1: {
			fontSize: "4rem",
		},
		h2: {
			fontSize: "3rem",
		},
		h3: {
			fontSize: "2.5rem",
		},
		h4: {
			fontSize: "1.75rem",
		},
		h5: {
			fontSize: "1.5rem",
		},
		h6: {
			fontSize: "1.25rem",
		},
	},
	defaultColorScheme: "dark",
	colorSchemeSelector: "media",
});
