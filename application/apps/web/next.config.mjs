import { withPigment } from "@pigment-css/nextjs-plugin";
import "./src/env.mjs";
import { theme } from "./src/features/ui/components/ThemeRegistry/theme.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	experimental: {
		serverComponentsExternalPackages: [
			"lighthouse",
			"lighthouse/cli",
			// "pino",
			// "pino-pretty",
		],
	},
	redirects: () => [
		{
			source: "/",
			destination: "/project",
			permanent: false,
		},
		{
			source: "/project",
			destination: "/project/new",
			permanent: true,
		},
	],
};

/** @type {import('@pigment-css/nextjs-plugin').PigmentOptions} */
const pigmentConfig = {
	transformLibraries: ["@mui/material", "@mui/lab"],
	theme,
};

export default withPigment(nextConfig, pigmentConfig);
