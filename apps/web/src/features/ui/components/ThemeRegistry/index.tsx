import CssBaseline from "@mui/material/CssBaseline";
import { Roboto } from "next/font/google";
import React from "react";
import "@mui/material-pigment-css/styles.css";

export const font = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family",
});

export function ThemeRegistry() {
  return (
    <>
      <CssBaseline />
    </>
  );
}
