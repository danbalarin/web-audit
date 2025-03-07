import { BaseRunner } from "@repo/api";
import { type BaseContext, type MetricResult } from "@repo/api/types";
import ky, { KyInstance } from "ky-universal";
import { ZapSpider } from "./api/ZapSpider";
import { AdditionalData } from "./types/additionalData";
import { ZapAlert } from "./types/zapAlert";
import { ZapScanner } from "./types/zapScanner";

export type ZapRunnerOptions = {
	url: string;
	timeout?: number;
};

type Result = {
	alerts: ZapAlert[];
	scanners: ZapScanner[];
};

export class ZapRunner extends BaseRunner<Result> {
	private readonly _options: Required<ZapRunnerOptions>;
	private readonly _api: KyInstance;

	constructor(_options: ZapRunnerOptions) {
		super();

		this._options = Object.assign({ timeout: 5000 }, _options);
		this._api = ky.create({
			prefixUrl: this._options.url,
		});
	}

	async transform({ alerts }: Result): Promise<MetricResult[]> {
		const composeMetric = (name: string, alertRef: string) => {
			const foundAlerts = alerts.filter((a) => a.alertRef === alertRef);
			return {
				id: name,
				value: foundAlerts.length,
				additionalData: { alerts: foundAlerts } as AdditionalData,
			};
		};

		return [composeMetric("content-security-policies", "10038-1")];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const spider = new ZapSpider(this._api, this._options.timeout);

		const session = await spider.zapApi.createSession();
		if (session.Result !== "OK") {
			throw new Error("Failed to create session");
		}

		// const mode = await spider.zapApi.setMode("protect");
		// if (mode.Result !== "OK") {
		// 	throw new Error("Failed to set mode");
		// }

		const data = await spider.run(context.url);

		return {
			alerts: data,
			scanners: await spider.zapApi.getPassiveScanners(),
		};
	}
}
