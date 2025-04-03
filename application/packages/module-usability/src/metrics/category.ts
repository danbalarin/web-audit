import type { CategoryDescription, MetricDescription } from "@repo/api/types";

import { Arbitrary } from "@repo/api/metrics";
import { ClearFeedback } from "./clear-feedback";
import { FlexibleNavigation } from "./flexible-navigation";
import { IconMetaphors } from "./icon-metaphors";
import { ImmediateFeedback } from "./immediate-feedback";
import { NotFoundPage } from "./not-found-page";
import { VisualConsistency } from "./visual-consistency";

const weights = {
	[NotFoundPage.id]: 1,
};

const sumWeights = Object.values(weights).reduce((a, b) => a + b, 0);

const metricsOrder = [
	NotFoundPage.id,
	ImmediateFeedback.id,
	ClearFeedback.id,
	IconMetaphors.id,
	FlexibleNavigation.id,
	VisualConsistency.id,
];

const metrics: MetricDescription[] = [
	NotFoundPage,
	ImmediateFeedback,
	ClearFeedback,
	IconMetaphors,
	FlexibleNavigation,
	VisualConsistency,
];

export const UsabilityCategory: CategoryDescription<"usability"> = {
	id: "usability",
	name: "Usability",
	description: "Usability and User Experience",
	metrics,
	scoreUnit: Arbitrary.PERCENTAGE,
	metricsOrder,
	score: (metricsData) => {
		let score = 0;
		let foundMetrics = false;
		for (const metricName in weights) {
			const metric = metricsData.find((m) => m.metric === metricName);
			const metricDescription = metrics.find((m) => m.id === metric?.metric);
			if (!metric || !metricDescription) {
				continue;
			}
			foundMetrics = true;
			score += metricDescription.score(+metric.value) * weights[metricName]!;
		}
		if (!foundMetrics) {
			return -1;
		}

		return score / sumWeights;
	},
	rank: (value) => {
		if (+value > 0.8) {
			return "good";
		}
		if (+value > 0.5) {
			return "average";
		}
		return "fail";
	},
};
