import puppeteer from "puppeteer";
import { env } from "~/env.mjs";
import { middleware } from "../trpc/init";

export const browserMiddleware = middleware(async ({ next, ctx }) => {
	try {
		const createBrowser = async () =>
			await puppeteer.launch({
				headless: true,
				executablePath: env.CHROMIUM_PATH,
				defaultViewport: null,
				args: [
					"--disable-gpu",
					"--disable-dev-shm-usage",
					"--disable-setuid-sandbox",
					"--no-first-run",
					"--no-sandbox",
					"--no-zygote",
					"--deterministic-fetch",
					"--disable-features=IsolateOrigins",
					"--disable-site-isolation-trials",
				],
				ignoreDefaultArgs: ["--enable-automation"],
			});

		const response = await next({
			ctx: {
				...ctx,
				createBrowser,
			},
		});

		return response;
	} catch (error) {
		throw new Error(`Error creating browser middleware`, { cause: error });
	}
});
