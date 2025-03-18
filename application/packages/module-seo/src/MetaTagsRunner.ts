import { BaseRunner } from "@repo/api";
import { type BaseContext, type MetricResult } from "@repo/api/types";

// biome-ignore lint/complexity/noBannedTypes: placeholder
export type MetaTagsRunnerOptions = {};

type Result = object;

export class MetaTagsRunner extends BaseRunner<Result> {
	private readonly _options: Required<MetaTagsRunnerOptions>;

	constructor(_options: MetaTagsRunnerOptions) {
		super("MetaTagsRunner");

		this._options = Object.assign({}, _options);
	}

	async transform(_result: Result): Promise<MetricResult[]> {
		return [];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const browser = await context.createBrowser();
		const page = await browser.newPage();
		await page.setBypassCSP(true);
		await page.goto(context.url);
		await page.waitForNetworkIdle({ idleTime: 1000 });

		try {
			return {};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
