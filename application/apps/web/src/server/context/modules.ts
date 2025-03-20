import { AccessibilityModule } from "@repo/module-accessibility";
import { PerformanceModule } from "@repo/module-performance";
import { SecurityModule } from "@repo/module-security";
import { SEOModule } from "@repo/module-seo";

export const createModulesContext = async () => {
	const PerformanceModuleInstance = new PerformanceModule({
		lighthouseRunnerOptions: { numberOfRuns: 1 },
	});

	const AccessibilityModuleInstance = new AccessibilityModule({});

	const SecurityModuleInstance = new SecurityModule({});

	const SEOModuleInstance = new SEOModule({});

	return {
		modules: [
			PerformanceModuleInstance,
			AccessibilityModuleInstance,
			SecurityModuleInstance,
			SEOModuleInstance,
		],
	};
};
