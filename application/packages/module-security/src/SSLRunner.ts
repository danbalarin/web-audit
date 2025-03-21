import { BaseRunner } from "@repo/api";
import { BaseContext, BaseRunnerOptions, MetricResult } from "@repo/api/types";
import sslChecker from "ssl-checker";
import { SSLCert } from "./metrics/ssl-cert";

export type SSLRunnerOptions = BaseRunnerOptions;

type Result = Awaited<ReturnType<typeof sslChecker>>;

export class SSLRunner extends BaseRunner<Result> {
	constructor(options: SSLRunnerOptions) {
		super("SSLRunner", options);
	}

	protected async transform(result: Result): Promise<MetricResult[]> {
		return [
			{
				id: SSLCert.id,
				value: result.valid ? 1 : 0,
				additionalData: result,
			},
		];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	protected async runRaw(context: BaseContext): Promise<Result> {
		const { hostname } = new URL(context.url);
		return sslChecker(hostname);
	}
}
