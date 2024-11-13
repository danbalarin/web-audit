import { BaseModule } from "@repo/api";
import {
	PerformanceGatherer,
	PerformanceGathererOptions,
} from "./PerformanceGatherer";

export type PerformanceModuleOptions = {
	performanceOptions: PerformanceGathererOptions;
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
			gatherers: [
				new PerformanceGatherer(_performanceModuleOptions.performanceOptions),
			],
		});
	}
}
