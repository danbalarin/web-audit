import { AuditCategoryResult, BaseContext, BaseModule } from "@repo/api";
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

	protected async _execute(context: BaseContext): Promise<AuditCategoryResult> {
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
