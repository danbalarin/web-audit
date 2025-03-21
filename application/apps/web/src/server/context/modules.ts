import { AccessibilityModule } from "@repo/module-accessibility";
import { PerformanceModule } from "@repo/module-performance";
import { SecurityModule } from "@repo/module-security";
import { SEOModule } from "@repo/module-seo";
import { createModuleLogger } from "~/lib/logger";

export const createModulesContext = async () => {
	const PerformanceModuleInstance = new PerformanceModule({
		lighthouseRunnerOptions: { numberOfRuns: 1 },
		logger: createModuleLogger("performance"),
	});

	const AccessibilityModuleInstance = new AccessibilityModule({
		logger: createModuleLogger("accessibility"),
	});

	const SecurityModuleInstance = new SecurityModule({
		logger: createModuleLogger("security"),
	});

	const SEOModuleInstance = new SEOModule({
		logger: createModuleLogger("seo"),
	});

	return {
		modules: [
			PerformanceModuleInstance,
			AccessibilityModuleInstance,
			SecurityModuleInstance,
			SEOModuleInstance,
		],
	};
};
