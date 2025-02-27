import { BaseModule } from "@repo/api";
import { type BaseContext, MetricResult } from "@repo/api/types";
import { LighthouseRunner, LighthouseRunnerOptions } from "./LighthouseRunner";
import { PuppeteerRunner } from "./PuppeteerRunner";

export type PerformanceModuleOptions = {
	lighthouseRunnerOptions: LighthouseRunnerOptions;
};

export class PerformanceModule extends BaseModule {
	constructor(
		private readonly _performanceModuleOptions: PerformanceModuleOptions,
	) {
		super({
			description: "Performance Module",
			name: "Performance",
			version: "1.0.0",
			id: "performance",
		});
	}

	protected async _execute(context: BaseContext) {
		const lighthouseRunner = new LighthouseRunner(
			this._performanceModuleOptions.lighthouseRunnerOptions,
		);

		const puppeteerRunner = new PuppeteerRunner({});

		const res = [] as MetricResult[];
		try {
			const lighthouse = await lighthouseRunner.run(context);
			res.push(...lighthouse);
		} catch (e) {
			// TODO logger
			console.error("Error running lighthouse", e);
		}

		this.emit("progress", { progress: 0.5 });

		try {
			const puppeteer = await puppeteerRunner.run(context);
			res.push(...puppeteer);
		} catch (e) {
			// TODO logger
			console.error("Error running puppeteer", e);
		}

		return {
			metrics: res,
			id: "performance",
		};
	}
}
