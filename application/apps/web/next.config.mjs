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
	const mdnFiles = [
		(await import.meta.resolve("@mdn/mdn-http-observatory"))
			.replace("file://", "")
			.replace("src/index.js", "conf/hsts-preload.json"),
	];
	const { fileList: additionalTracedFiles } = await nodeFileTrace(mdnFiles, {
		// ignore unnecesary files if nft includes too many
		ignore: (file) => {
			return file.replace(/\\/g, "/").startsWith("node_modules/.bin/");
		},
	});

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
