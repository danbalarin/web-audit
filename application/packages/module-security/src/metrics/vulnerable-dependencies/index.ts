import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";

export const VulnerableDependencies: MetricDescription = {
	id: "vulnerable-dependencies",
	name: "Vulnerable Dependencies",
	description: "",
	unit: Arbitrary.NUMBER,
	compare: createMetricCompareLowerIsBetter(0),
	rank: (val) => (+val > 0 ? "fail" : "good"),
	score: (val) => (+val > 0 ? 0 : 100),
};
