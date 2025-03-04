import { type CategoryDescription } from "@repo/api/types";

import { Arbitrary } from "@repo/api/metrics";
import { ACT } from "./act";
import { BEST_PRACTICE } from "./best-practice";
import { WCAG2A } from "./wcag2a";
import { WCAG2AA } from "./wcag2aa";
import { WCAG2AAA } from "./wcag2aaa";
import { WCAG21A } from "./wcag21a";
import { WCAG21AA } from "./wcag21aa";
import { WCAG22AA } from "./wcag22aa";

const metrics = [
	WCAG2A,
	WCAG2AA,
	WCAG2AAA,
	WCAG21A,
	WCAG21AA,
	WCAG22AA,
	ACT,
	BEST_PRACTICE,
];

export const AccessibilityCategory: CategoryDescription<"accessibility"> = {
	id: "accessibility",
	name: "Accessibility",
	description: "Accessibility metrics",
	metrics,
	scoreUnit: Arbitrary.STRING,
	score: (metricsData) => {
		const data = metricsData
			.filter((m) => m.category === "accessibility")
			.sort((a, b) => +b.value - +a.value);
		const bestResult = data[0];
		const metricDescription = metrics.find((m) => m.id === bestResult?.metric);
		return bestResult
			? `${metricDescription?.name} (${Math.round(+bestResult.value * 100)}%)`
			: "N/A";
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
