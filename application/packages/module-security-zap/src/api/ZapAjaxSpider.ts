import { KyInstance } from "ky";
import { ZapAlert } from "../types/zapAlert";
import { ZapApi, type ZapSuccessResponse } from "./ZapApi";

export class ZapAjaxSpider {
	public zapApi: ZapApi;
	constructor(
		private readonly _api: KyInstance,
		private readonly _timeout: number,
	) {
		this.zapApi = new ZapApi(_api);
	}

	private async setBrowser(
		browserId:
			| "chrome"
			| "chrome-headless"
			| "firefox"
			| "firefox-headless"
			| "safari"
			| "htmlunit",
	) {
		const searchParams = new URLSearchParams();
		searchParams.append("String", browserId);
		return this._api
			.get("JSON/ajaxSpider/action/setOptionBrowserId", { searchParams })
			.json<ZapSuccessResponse>();
	}

	private async setMaxCrawlDepth(depth: number) {
		const searchParams = new URLSearchParams();
		searchParams.append("Integer", depth.toString());
		return this._api
			.get("JSON/ajaxSpider/action/setOptionMaxCrawlDepth", { searchParams })
			.json<ZapSuccessResponse>();
	}

	private async getScanStatus() {
		return this._api
			.get("JSON/ajaxSpider/view/status/")
			.json<{ status: "running" | "stopped" }>();
	}

	private async startSpider(url: string) {
		const browser = await this.setBrowser("firefox-headless");
		if (browser.Result !== "OK") {
			throw new Error("Failed to set browser");
		}

		const maxDepth = await this.setMaxCrawlDepth(1);
		if (maxDepth.Result !== "OK") {
			throw new Error("Failed to set max crawl depth");
		}

		const searchParams = new URLSearchParams();
		searchParams.append("url", url);
		const spider = await this._api
			.get("JSON/ajaxSpider/action/scan/", { searchParams })
			.json<ZapSuccessResponse>();

		if (spider.Result !== "OK") {
			console.log(spider);
			throw new Error("Failed to start spider");
		}
	}

	private async stopSpider() {
		return this._api
			.get("JSON/ajaxSpider/action/stop")
			.json<ZapSuccessResponse>();
	}

	private async waitForScan() {
		const timeout = setTimeout(() => {
			this.stopSpider();
		}, this._timeout);

		const safetyTimeout = setTimeout(() => {
			throw new Error("ZAP scan timed out");
		}, this._timeout * 1.2);

		while (true) {
			const data = await this.getScanStatus();
			// TODO: log progress
			console.log(data);

			if (data.status === "stopped") {
				clearTimeout(timeout);
				clearTimeout(safetyTimeout);
				return;
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}

	private async waitForPassiveScan() {
		while (true) {
			const data = await this.zapApi.getPassiveScanQueue();
			// TODO: log progress
			console.log(data);

			if (data.recordsToScan === "0") {
				return;
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}

	async run(url: string): Promise<ZapAlert[]> {
		await this.startSpider(url);

		await this.waitForScan();
		await this.waitForPassiveScan();

		const results = await this.zapApi.getScanResults(url);

		return results.alerts;
	}
}
