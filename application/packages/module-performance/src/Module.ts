import { BaseModule } from "@repo/api";
import {
	LighthouseRunner,
	type LighthouseRunnerOptions,
} from "./LighthouseRunner";
import { PuppeteerRunner } from "./PuppeteerRunner";

import type { BaseModuleOptions } from "@repo/api/types";
import pkg from "../package.json";

export type PerformanceModuleOptions = BaseModuleOptions & {
	lighthouseRunnerOptions: Omit<LighthouseRunnerOptions, "logger">;
};

export class PerformanceModule extends BaseModule {
	constructor(readonly options: PerformanceModuleOptions) {
		super({
			description: pkg.description,
			name: "Performance",
			version: pkg.version,
			id: "performance",
			logger: options.logger,
		});
		this._runners = [
			new LighthouseRunner({
				...options.lighthouseRunnerOptions,
				logger: options.logger,
			}),
			new PuppeteerRunner({
				logger: options.logger,
			}),
		];
	}
}
