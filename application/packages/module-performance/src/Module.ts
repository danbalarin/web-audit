import { BaseModule } from "@repo/api";
import { LighthouseRunner, LighthouseRunnerOptions } from "./LighthouseRunner";
import { PuppeteerRunner } from "./PuppeteerRunner";

import { BaseModuleOptions } from "@repo/api/types";
import pkg from "../package.json";

export type PerformanceModuleOptions = BaseModuleOptions & {
	lighthouseRunnerOptions: Omit<LighthouseRunnerOptions, "logger">;
};

export class PerformanceModule extends BaseModule {
	constructor(readonly performanceModuleOptions: PerformanceModuleOptions) {
		super({
			description: pkg.description,
			name: "Performance",
			version: pkg.version,
			id: "performance",
			logger: performanceModuleOptions.logger,
		});

		this._runners = [
			new LighthouseRunner({
				...performanceModuleOptions.lighthouseRunnerOptions,
				logger: this.logger,
			}),
			new PuppeteerRunner({
				logger: this.logger,
			}),
		];
	}
}
