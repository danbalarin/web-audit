import { BaseRunner } from "@repo/api";
import { BaseContext, MetricResult } from "@repo/api/types";
import sslChecker from "ssl-checker";

// biome-ignore lint/complexity/noBannedTypes: placeholder
export type SSLRunnerOptions = {};

type Result = Awaited<ReturnType<typeof sslChecker>>;

export class SSLRunner extends BaseRunner {
	private readonly _options: Required<SSLRunnerOptions>;

	constructor(_options: SSLRunnerOptions) {
		super();

		this._options = Object.assign({}, _options);
	}
	async transform(result: Result): Promise<MetricResult[]> {
		return [
			{
				id: "ssl-cert",
				value: result.valid ? 1 : 0,
				additionalData: result,
			},
		];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const { hostname } = new URL(context.url);
		return sslChecker(hostname);
	}
}
