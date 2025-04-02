import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareHigherIsBetter } from "@repo/api/utils";
import { axeScoring } from "../../utils/axeScoring";

export const WCAG21AA: MetricDescription = {
	id: "wcag21aa",
	name: "WCAG 2.1 Level AA",
	description:
		"Measures compliance with WCAG 2.1 Level AA criteria, which enhance WCAG 2.0 AA with additional requirements for mobile accessibility, low vision, and cognitive limitations.",
	unit: Arbitrary.PERCENTAGE,
	compare: createMetricCompareHigherIsBetter(0),
	...axeScoring,
};
