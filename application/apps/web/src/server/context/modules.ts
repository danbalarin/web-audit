import { AccessibilityModule } from "@repo/module-accessibility";
import { PerformanceModule } from "@repo/module-performance";
import { SecurityModule } from "@repo/module-security";
import { SEOModule } from "@repo/module-seo";

export const createModulesContext = async () => {
	const _PerformanceModuleInstance = new PerformanceModule({
		lighthouseRunnerOptions: { numberOfRuns: 1 },
	});

	const _AccessibilityModuleInstance = new AccessibilityModule({});

	const _SecurityModuleInstance = new SecurityModule({});

	const SEOModuleInstance = new SEOModule({});

	return {
		modules: [
			// _PerformanceModuleInstance,
			// _AccessibilityModuleInstance,
			// _SecurityModuleInstance,
			SEOModuleInstance,
		],
	};
};
