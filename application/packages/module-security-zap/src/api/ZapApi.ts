import { KyInstance } from "ky";
import { ZapAlert } from "../types/zapAlert";
import { ZapScanner } from "../types/zapScanner";

export class ZapApi {
	constructor(private readonly _api: KyInstance) {}

	async getPassiveScanners() {
		const { scanners } = await this._api
			.get("JSON/pscan/view/scanners")
			.json<{ scanners: ZapScanner[] }>();

		return scanners.filter((s) => s.enabled === "true");
	}

	async getScanResults(url: string) {
		const searchParams = new URLSearchParams();
		searchParams.append("baseUrl", url);
		return this._api
			.get("JSON/core/view/alerts", { searchParams })
			.json<{ alerts: ZapAlert[] }>();
	}

	async getPassiveScanQueue() {
		return this._api
			.get("JSON/pscan/view/recordsToScan")
			.json<{ recordsToScan: string }>();
	}

	async setMode(mode: "safe" | "protect" | "standard" | "attack") {
		const searchParams = new URLSearchParams();
		searchParams.append("mode", mode);
		return this._api
			.get("JSON/core/action/setMode", { searchParams })
			.json<ZapSuccessResponse>();
	}

	async createSession() {
		return this._api
			.get("JSON/core/action/newSession/?name=&overwrite=true")
			.json<ZapSuccessResponse>();
	}
}
export type ZapSuccessResponse = {
	Result: "OK";
};
