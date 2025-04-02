import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareHigherIsBetter } from "@repo/api/utils";
import { axeScoring } from "../../utils/axeScoring";

export const WCAG2AA: MetricDescription = {
	id: "wcag2aa",
	name: "WCAG 2.0 Level AA",
	description:
		"Evaluates compliance with intermediate accessibility requirements from WCAG 2.0 Level AA, including both Level A criteria and additional Level AA standards.",
	unit: Arbitrary.PERCENTAGE,
	compare: createMetricCompareHigherIsBetter(0),
	...axeScoring,
};
