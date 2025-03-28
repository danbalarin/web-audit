import { AccessibilityModule } from "@repo/module-accessibility";
import { PerformanceModule } from "@repo/module-performance";
import { SecurityModule } from "@repo/module-security";
import { SEOModule } from "@repo/module-seo";
import { UsabilityModule } from "@repo/module-usability";
import { createModuleLogger } from "~/lib/logger";

export const createModulesContext = async () => {
	const _PerformanceModuleInstance = new PerformanceModule({
		lighthouseRunnerOptions: { numberOfRuns: 1 },
		logger: createModuleLogger("performance"),
	});

	const _AccessibilityModuleInstance = new AccessibilityModule({
		logger: createModuleLogger("accessibility"),
	});

	const _SecurityModuleInstance = new SecurityModule({
		logger: createModuleLogger("security"),
	});

	const _SEOModuleInstance = new SEOModule({
		logger: createModuleLogger("seo"),
	});

	const UsabilityModuleInstance = new UsabilityModule({
		logger: createModuleLogger("usability"),
	});

	return {
		modules: [
			_PerformanceModuleInstance,
			_AccessibilityModuleInstance,
			_SecurityModuleInstance,
			_SEOModuleInstance,
			UsabilityModuleInstance,
		],
	};
};
