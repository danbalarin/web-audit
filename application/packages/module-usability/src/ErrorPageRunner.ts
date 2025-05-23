import { join } from "path";
import { BaseRunner, safeWaitForLoad } from "@repo/api";
import type {
	BaseContext,
	BaseRunnerOptions,
	MetricResult,
} from "@repo/api/types";
import type { Page } from "puppeteer";

import { NotFoundPage } from "./metrics/not-found-page";

export type ErrorPageRunnerOptions = BaseRunnerOptions;

type NotFound = {
	status: number;
	title?: string | null;
	headings: {
		h1?: string | null;
		h2?: string | null;
		h3?: string | null;
		h4?: string | null;
		h5?: string | null;
		h6?: string | null;
	};
	content?: string | null;
};

type Result = {
	notFound: NotFound;
};

export class ErrorPageRunner extends BaseRunner<
	Result,
	BaseContext,
	ErrorPageRunnerOptions
> {
	constructor(options: ErrorPageRunnerOptions) {
		super("ErrorPageRunner", options);
	}

	async transform({ notFound }: Result): Promise<MetricResult[]> {
		return [
			{
				id: NotFoundPage.id,
				value:
					notFound.status === 404 || notFound.content?.includes("404") ? 1 : 0,
				additionalData: notFound,
			},
		];
	}

	async checkNotFound(baseUrl: string, page: Page) {
		const salt = Math.floor(Math.random() * 1000);
		const url = join(baseUrl, "nonexistent", "page", salt.toString());
		this._logger?.debug(`Checking for 404 at ${url}`);
		let status = -1;
		try {
			page.setRequestInterception(true);
			page.on("request", (request) => {
				request.continue();
			});
			page.on("response", (response) => {
				status = response.status();
				return response;
			});
			await page.goto(url);
			await safeWaitForLoad(page);
		} catch (error) {
			this._logger?.error(error, "Error navigating to nonexistent URL:");
		}

		const notFound = await page.evaluate(() => {
			const title = document.querySelector("title");
			const result = {
				title: title?.innerText,
				headings: {
					h1: document.querySelector("h1")?.innerText,
					h2: document.querySelector("h2")?.innerText,
					h3: document.querySelector("h3")?.innerText,
					h4: document.querySelector("h4")?.innerText,
					h5: document.querySelector("h5")?.innerText,
					h6: document.querySelector("h6")?.innerText,
				},
				content: document.querySelector("body")?.innerText,
			};
			return result;
		});
		try {
			await page.close();
		} catch (_e) {
			void 0;
		}

		return { ...notFound, status };
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const browser = await context.createBrowser();

		const promises = [
			this.checkNotFound(context.url, await browser.newPage()),
		] as const;

		const [notFound] = await Promise.all(promises);

		try {
			await browser.close();
		} catch (_e) {
			void _e;
		}

		try {
			return {
				notFound,
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
