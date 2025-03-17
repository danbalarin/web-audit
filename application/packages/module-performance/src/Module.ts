import { BaseModule } from "@repo/api";
import { LighthouseRunner, LighthouseRunnerOptions } from "./LighthouseRunner";
import { PuppeteerRunner } from "./PuppeteerRunner";

import pkg from "../package.json";

export type PerformanceModuleOptions = {
	lighthouseRunnerOptions: LighthouseRunnerOptions;
};

export class PerformanceModule extends BaseModule {
	constructor(readonly performanceModuleOptions: PerformanceModuleOptions) {
		super({
			description: pkg.description,
			name: "Performance",
			version: pkg.version,
			id: "performance",
		});

		this._runners = [
			new LighthouseRunner(performanceModuleOptions.lighthouseRunnerOptions),
			new PuppeteerRunner({}),
		];
	}
}
