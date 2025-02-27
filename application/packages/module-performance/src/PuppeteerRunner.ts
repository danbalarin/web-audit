import { BaseRunner } from "@repo/api";
import { type BaseContext, type MetricResult } from "@repo/api/types";

// biome-ignore lint/complexity/noBannedTypes: placeholder
export type PuppeteerRunnerOptions = {};

type Result = {
	requests: string[];
};

export class PuppeteerRunner extends BaseRunner<Result> {
	private readonly _options: Required<PuppeteerRunnerOptions>;

	constructor(_options: PuppeteerRunnerOptions) {
		super();

		this._options = Object.assign({}, _options);
	}

	async transform(result: Result): Promise<MetricResult[]> {
		return [
			{
				id: "total-requests",
				value: result.requests.length,
			},
		];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const requests = [] as string[];

		const browser = await context.createBrowser();
		const page = await browser.newPage();

		page.on("request", (request) => {
			requests.push(request.url());
		});

		page.goto(context.url);
		await page.waitForNavigation();
		await page.waitForNetworkIdle({ idleTime: 1000 });

		return {
			requests,
		};
	}
}
