import { AccessibilityModule } from "@repo/module-accessibility";
import { PerformanceModule } from "@repo/module-performance";

export const createModulesContext = async () => {
	const PerformanceModuleInstance = new PerformanceModule({
		lighthouseRunnerOptions: { numberOfRuns: 1 },
	});

	const AccessibilityModuleInstance = new AccessibilityModule({});

	// const TechnologyModuleInstance = new TechnologyModule({});

	return {
		modules: [PerformanceModuleInstance, AccessibilityModuleInstance],
	};
};
