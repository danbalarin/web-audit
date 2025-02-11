import { BaseModule } from "@repo/api";
import { type BaseContext } from "@repo/api/types";
import { LighthouseRunner, LighthouseRunnerOptions } from "./LighthouseRunner";

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
		const runner = new LighthouseRunner(
			this._performanceModuleOptions.lighthouseRunnerOptions,
		);

		const results = await runner.run(context);

		return {
			metrics: results,
			id: "performance",
		};
	}
}
