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

		CHROMIUM_PATH: z.string().optional(),
		DB_USER: z.string(),
		DB_PASSWORD: z.string(),
		DB_NAME: z.string(),
		DB_HOST: z.string().optional().default("localhost"),
		DB_PORT: z.coerce.number().optional().default(5432),

		BASE_URL: z.string().default("http://localhost:3000"),
	},

	client: {
		NEXT_PUBLIC_DEBUG: z.boolean({ coerce: true }).default(false),
		NEXT_PUBLIC_LOG_LEVEL: z
			.enum(["trace", "debug", "info", "warn", "error", "fatal"])
			.default("info"),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		CI: process.env.CI,
		NODE_ENV: process.env.NODE_ENV,
		CHROMIUM_PATH: process.env.CHROMIUM_PATH,
		NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
		NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_NAME: process.env.DB_NAME,
		DB_HOST: process.env.DB_HOST,
		DB_PORT: process.env.DB_PORT,

		BASE_URL: process.env.BASE_URL,
	},
});
