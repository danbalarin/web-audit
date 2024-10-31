import { withPigment } from "@pigment-css/nextjs-plugin";
import { theme } from "./src/features/ui/components/ThemeRegistry/theme.mjs";
import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["lighthouse", "lighthouse/cli"],
  },
};

/** @type {import('@pigment-css/nextjs-plugin').PigmentOptions} */
const pigmentConfig = {
  transformLibraries: ["@mui/material", "@mui/lab"],
  theme,
};

export default withPigment(nextConfig, pigmentConfig);
