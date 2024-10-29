import { createTheme } from "@mui/material";

export const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-family)",
  },
  defaultColorScheme: "dark",
  colorSchemeSelector: "media",
});
