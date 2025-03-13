import { type CategoryDescription } from "@repo/api/types";

import { Arbitrary } from "@repo/api/metrics";
import { VulnerableDependencies } from "./vulnerable-dependencies";

const metrics = [VulnerableDependencies];

export const SecurityCategory: CategoryDescription<"security"> = {
	id: "security",
	name: "Security",
	description: "Security metrics",
	metrics,
	scoreUnit: Arbitrary.STRING,
	score: (_metricsData) => {
		return "N/A";
	},
	rank: (value) => {
		const score = +(value.toString().match(/(\d+)(?!.*\d)/)?.[0] ?? -1);
		if (score > 90) {
			return "good";
		}
		if (score > 50) {
			return "average";
		}
		return "fail";
	},
};
