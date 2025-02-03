import createMDX from "@next/mdx";
import { withPigment } from "@pigment-css/nextjs-plugin";

import "./src/env.mjs";
import { theme } from "./src/features/ui/components/ThemeRegistry/theme.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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

const withMDX = createMDX({
	// Add markdown plugins here, as desired
});

export default withMDX(withPigment(nextConfig, pigmentConfig));
