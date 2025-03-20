import createBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import { withPigment } from "@pigment-css/nextjs-plugin";
import { nodeFileTrace } from "@vercel/nft";

import path from "path";
import { fileURLToPath } from "url";
import "./src/env.mjs";
import { theme } from "./src/features/ui/components/ThemeRegistry/theme.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = async () => {
	const securityFiles = [
		(await import.meta.resolve("@mdn/mdn-http-observatory")).replace(
			"src/index.js",
			"conf/hsts-preload.json",
		),
	];
	const accessibilityFiles = [
		await import.meta.resolve("@axe-core/puppeteer"),
		await import.meta.resolve("axe-core"),
	];

	const { fileList: additionalTracedFiles } = await nodeFileTrace(
		[...securityFiles, ...accessibilityFiles].map((f) =>
			f.replace("file://", ""),
		),
		{
			// ignore unnecesary files if nft includes too many
			ignore: (file) => {
				return file.replace(/\\/g, "/").startsWith("node_modules/.bin/");
			},
		},
	);

	/** @type {import('next').NextConfig} */
	return {
		pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
		output: "standalone",
		serverExternalPackages: ["lighthouse", "lighthouse/cli"],
		experimental: {
			mdxRs: true,
		},
		// outputFileTracingRoot: path.resolve(
		// 	path.dirname(fileURLToPath(import.meta.url)),
		// 	"../../",
		// ),
		// outputFileTracingRoot: path.join(__dirname, "../../"),
		outputFileTracingIncludes: {
			"**": [...additionalTracedFiles],
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
		webpack: (config) => {
			config.resolve.alias = {
				...config.resolve.alias,
				"handlebars/runtime": "handlebars/dist/handlebars.js",
				handlebars: "handlebars/dist/handlebars.js",
			};

			return config;
		},
	};
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
	withMDX(withPigment(await nextConfig(), pigmentConfig)),
);
