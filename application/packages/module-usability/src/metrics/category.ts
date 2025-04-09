import type { CategoryDescription, MetricDescription } from "@repo/api/types";

import { Arbitrary, EMPTY_INPUT } from "@repo/api/metrics";
import { ActionConsistency } from "./action-consistency";
import { Aesthetics } from "./aesthetics";
import { BrandCompliance } from "./brand-compliance";
import { ClearFeedback } from "./clear-feedback";
import { ContextualCues } from "./contextual-cues";
import { FlexibleNavigation } from "./flexible-navigation";
import { IconMetaphors } from "./icon-metaphors";
import { ImmediateFeedback } from "./immediate-feedback";
import { NotFoundPage } from "./not-found-page";
import { VisualConsistency } from "./visual-consistency";

const weights = {
	[NotFoundPage.id]: 1,
	[ImmediateFeedback.id]: 1,
	[ClearFeedback.id]: 1,
	[IconMetaphors.id]: 1,
	[FlexibleNavigation.id]: 1,
	[VisualConsistency.id]: 1,
	[ActionConsistency.id]: 1,
	[ContextualCues.id]: 1,
	[Aesthetics.id]: 1,
	[BrandCompliance.id]: 1,
};

const manualMetrics = [
	ImmediateFeedback.id,
	ClearFeedback.id,
	IconMetaphors.id,
	FlexibleNavigation.id,
	VisualConsistency.id,
	ActionConsistency.id,
	ContextualCues.id,
	Aesthetics.id,
	BrandCompliance.id,
];

const sumWeights = Object.values(weights).reduce((a, b) => a + b, 0);

const metricsOrder = [
	NotFoundPage.id,
	ImmediateFeedback.id,
	ClearFeedback.id,
	IconMetaphors.id,
	FlexibleNavigation.id,
	VisualConsistency.id,
	ActionConsistency.id,
	ContextualCues.id,
	Aesthetics.id,
	BrandCompliance.id,
];

const metrics: MetricDescription[] = [
	NotFoundPage,
	ImmediateFeedback,
	ClearFeedback,
	IconMetaphors,
	FlexibleNavigation,
	VisualConsistency,
	ActionConsistency,
	ContextualCues,
	Aesthetics,
	BrandCompliance,
];

const getNotFilledMetrics = (
	metricsData: Parameters<CategoryDescription<"usability">["score"]>[0],
) => {
	const notFilledMetrics = metrics.filter((metric) => {
		return (
			manualMetrics.includes(metric.id) &&
			!metricsData.some(
				(m) => m.metric === metric.id && +m.value !== EMPTY_INPUT,
			)
		);
	});

	return notFilledMetrics;
};

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
			return { value: 0, status: "not-scored" };
		}
		const value = score / sumWeights / 100;

		const notFilledMetrics = getNotFilledMetrics(metricsData);

		if (notFilledMetrics.length > 0) {
			return { value, status: "incomplete" };
		}

		return { value, status: "scored" };
	},
	rank: ({ value, status }) => {
		if (status === "incomplete") {
			return "informational";
		}
		if (+value > 0.8) {
			return "good";
		}
		if (+value > 0.5) {
			return "average";
		}
		return "fail";
	},
};
