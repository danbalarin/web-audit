import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareHigherIsBetter } from "@repo/api/utils";
import { axeScoring } from "../../utils/axeScoring";

export const WCAG2A: MetricDescription = {
	id: "wcag2a",
	name: "WCAG 2.0 Level A",
	description:
		"Measures compliance with the minimum essential accessibility requirements defined in WCAG 2.0 Level A standards.",
	unit: Arbitrary.PERCENTAGE,
	compare: createMetricCompareHigherIsBetter(0),
	...axeScoring,
};
