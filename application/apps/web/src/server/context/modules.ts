import { PerformanceModule } from "@repo/module-performance";
import { TechnologyModule } from "@repo/module-technology";

export const createModulesContext = async () => {
	const PerformanceModuleInstance = new PerformanceModule({
		performanceOptions: { numberOfRuns: 1 },
	});

	const TechnologyModuleInstance = new TechnologyModule({});

	return {
		modules: [PerformanceModuleInstance, TechnologyModuleInstance],
	};
};
