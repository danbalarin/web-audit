import { BaseRunner, safeWaitForLoad } from "@repo/api";
import type {
	BaseContext,
	BaseRunnerOptions,
	MetricResult,
} from "@repo/api/types";
import { TotalRequests } from "./metrics/total-requests";

export type PuppeteerRunnerOptions = BaseRunnerOptions;

type Result = {
	requests: string[];
};

export class PuppeteerRunner extends BaseRunner<Result> {
	constructor(options: PuppeteerRunnerOptions) {
		super("PuppeteerRunner", options);
	}

	protected async transform(result: Result): Promise<MetricResult[]> {
		return [
			{
				id: TotalRequests.id,
				value: result.requests.length,
			},
		];
	}

	protected async runRaw(context: BaseContext): Promise<Result> {
		const requests = [] as string[];

		const browser = await context.createBrowser();
		const page = await browser.newPage();

		page.on("request", (request) => {
			requests.push(request.url());
		});

		page.goto(context.url);
		await safeWaitForLoad(page);

		try {
			await browser.close();
		} catch (_e) {
			void _e;
		}

		return {
			requests,
		};
	}
}
