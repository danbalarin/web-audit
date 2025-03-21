import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";

export const FacebookPreview: MetricDescription = {
	id: "facebookPreview",
	name: "Facebook Preview",
	description: "",
	unit: Arbitrary.IMAGE,
	compare: () => 0,
	rank: () => "informational",
	score: () => 100,
};
