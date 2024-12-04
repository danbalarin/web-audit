import puppeteer from "puppeteer";
import { env } from "~/env.mjs";
import { middleware } from "../trpc/init";

export const browserMiddleware = middleware(async ({ next, ctx }) => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			executablePath: env.CHROMIUM_PATH,
			args: ["--no-sandbox"],
		});

		return next({
			ctx: {
				...ctx,
				browser: browser,
			},
		});
	} catch (error) {
		throw new Error(`Error creating browser middleware`, { cause: error });
	}
});
