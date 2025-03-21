import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";

export const TwitterPreview: MetricDescription = {
	id: "twitterPreview",
	name: "Twitter Preview",
	description: "",
	unit: Arbitrary.IMAGE,
	compare: () => 0,
	rank: () => "informational",
	score: () => 100,
};
