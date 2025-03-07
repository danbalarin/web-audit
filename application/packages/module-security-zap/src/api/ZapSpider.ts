import { KyInstance } from "ky";
import { ZapAlert } from "../types/zapAlert";
import { ZapApi } from "./ZapApi";

export class ZapSpider {
	public zapApi: ZapApi;
	constructor(
		private readonly _api: KyInstance,
		private readonly _timeout: number,
	) {
		this.zapApi = new ZapApi(_api);
	}

	private async getScanStatus(scanId: string) {
		const searchParams = new URLSearchParams();
		searchParams.append("scanId", scanId);
		return this._api
			.get("JSON/spider/view/status/", { searchParams })
			.json<{ status: string }>();
	}

	private async startSpider(url: string): Promise<string> {
		const searchParams = new URLSearchParams();
		searchParams.append("url", url);
		searchParams.append("maxChildren", "1");
		searchParams.append("recurse", "false");
		const { scan: scanId } = await this._api
			.get("JSON/spider/action/scan/", { searchParams })
			.json<{ scan: string }>();
		return scanId;
	}

	async run(url: string): Promise<ZapAlert[]> {
		const scanId = await this.startSpider(url);

		let timedOut = false;
		const timeout = setTimeout(() => {
			timedOut = true;
		}, this._timeout);

		while (!timedOut) {
			const data = await this.getScanStatus(scanId);
			// TODO: log progress
			console.log(data);

			if (data.status === "100") {
				clearTimeout(timeout);
				break;
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
		while (!timedOut) {
			const data = await this.zapApi.getPassiveScanQueue();
			// TODO: log progress
			console.log(data);

			if (data.recordsToScan === "0") {
				clearTimeout(timeout);
				break;
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		if (timedOut) {
			throw new Error("ZAP scan timed out");
		}

		const results = await this.zapApi.getScanResults(url);

		return results.alerts;
	}
}
