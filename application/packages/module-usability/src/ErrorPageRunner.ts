import { join } from "path";
import { BaseRunner } from "@repo/api";
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

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async checkNotFound(baseUrl: string, page: Page) {
		const salt = Math.floor(Math.random() * 1000);
		const url = join(baseUrl, "nonexistent", "page", salt.toString());
		this._logger?.debug("Checking URL:", url);
		let status = -1;
		try {
			page.setRequestInterception(true);
			page.on("response", (response) => {
				status = response.status();
			});
			await page.goto(url);
			await page.waitForNetworkIdle({ idleTime: 1000 });
		} catch (error) {
			this._logger?.debug("Error navigating to nonexistent URL:", error);
		}

		const notFound = await page.evaluate(() => {
			const title = document.querySelector("title");
			const result = {
				status,
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

		return notFound;
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const browser = await context.createBrowser();
		const page = await browser.newPage();
		await page.goto(context.url);
		await page.waitForNetworkIdle({ idleTime: 1000 });

		const promises = [
			this.checkNotFound(context.url, await browser.newPage()),
		] as const;

		const [notFound] = await Promise.all(promises);

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
