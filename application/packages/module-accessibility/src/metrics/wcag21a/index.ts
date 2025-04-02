import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareHigherIsBetter } from "@repo/api/utils";
import { axeScoring } from "../../utils/axeScoring";

export const WCAG21A: MetricDescription = {
	id: "wcag21a",
	name: "WCAG 2.1 Level A",
	description:
		"Evaluates compliance with WCAG 2.1 Level A criteria, which expand upon WCAG 2.0 with additional requirements for mobile accessibility and cognitive disabilities.",
	unit: Arbitrary.PERCENTAGE,
	compare: createMetricCompareHigherIsBetter(0),
	...axeScoring,
};
