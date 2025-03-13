import { AccessibilityModule } from "@repo/module-accessibility";
import { PerformanceModule } from "@repo/module-performance";
import { SecurityModule } from "@repo/module-security";

export const createModulesContext = async () => {
	const _PerformanceModuleInstance = new PerformanceModule({
		lighthouseRunnerOptions: { numberOfRuns: 1 },
	});

	const _AccessibilityModuleInstance = new AccessibilityModule({});

	const SecurityModuleInstance = new SecurityModule({});

	// const TechnologyModuleInstance = new TechnologyModule({});

	return {
		modules: [SecurityModuleInstance],
	};
};
