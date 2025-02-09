/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		CI: z.boolean({ coerce: true }).default(false),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),

		/**
		 * Absolute URL to exposed website.
		 */
		SITE_URL: z
			.string()
			.regex(/^[.a-z\d-]*[a-z\d-]+((:[\d]+)|(\.[a-z]{2,}))$/i, "Invalid domain")
			.nullish()
			.transform((url) => (url ? `https://${url}` : "http://localhost:3000")),

		CHROMIUM_PATH: z.string().optional(),
	},

	client: {
		NEXT_PUBLIC_DEBUG: z.boolean({ coerce: true }).default(false),
		NEXT_PUBLIC_LOG_LEVEL: z
			.enum(["trace", "debug", "info", "warn", "error", "fatal"])
			.default("info"),
		NEXT_PUBLIC_ELECTRIC_SQL_BASE_URL: z.string(),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		CI: process.env.CI,
		NODE_ENV: process.env.NODE_ENV,
		SITE_URL: process.env.VERCEL_URL,
		CHROMIUM_PATH: process.env.CHROMIUM_PATH,
		NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
		NEXT_PUBLIC_ELECTRIC_SQL_BASE_URL:
			process.env.NEXT_PUBLIC_ELECTRIC_SQL_BASE_URL,
		NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
	},
});
