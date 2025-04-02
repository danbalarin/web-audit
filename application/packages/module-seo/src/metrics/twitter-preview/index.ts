import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";

export const TwitterPreview: MetricDescription = {
	id: "twitterPreview",
	name: "Twitter Preview",
	description:
		"Provides a visual representation of how webpage content will appear when shared on Twitter based on implemented Twitter Card tags.",
	unit: Arbitrary.IMAGE,
	compare: () => 0,
	rank: () => "informational",
	score: () => 100,
};
