import createBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import { withPigment } from "@pigment-css/nextjs-plugin";

import "./src/env.mjs";
import { theme } from "./src/features/ui/components/ThemeRegistry/theme.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	output: "standalone",
	serverExternalPackages: ["lighthouse", "lighthouse/cli"],
	experimental: {
		mdxRs: true,
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
	asyncResolve: (what) => {
		if (what.includes("nuqs")) {
			return import.meta.resolve(what).replace("file://", "");
		}
		return null;
	},
	theme,
};

const withMDX = createMDX({});

const withBundleAnalyzer = createBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(
	withMDX(withPigment(nextConfig, pigmentConfig)),
);
