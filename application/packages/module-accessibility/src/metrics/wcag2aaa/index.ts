import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareHigherIsBetter } from "@repo/api/utils";
import { axeScoring } from "../../utils/axeScoring";

export const WCAG2AAA: MetricDescription = {
	id: "wcag2aaa",
	name: "WCAG 2.0 Level AAA",
	description:
		"Measures compliance with the highest level of accessibility requirements in WCAG 2.0, covering all A, AA, and AAA criteria for maximum accessibility.",
	unit: Arbitrary.PERCENTAGE,
	compare: createMetricCompareHigherIsBetter(0),
	...axeScoring,
};
