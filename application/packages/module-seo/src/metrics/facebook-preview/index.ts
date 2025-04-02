import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";

export const FacebookPreview: MetricDescription = {
	id: "facebookPreview",
	name: "Facebook Preview",
	description:
		"Shows a visual simulation of how webpage content will appear when shared on Facebook based on implemented Open Graph meta tags.",
	unit: Arbitrary.IMAGE,
	compare: () => 0,
	rank: () => "informational",
	score: () => 100,
};
