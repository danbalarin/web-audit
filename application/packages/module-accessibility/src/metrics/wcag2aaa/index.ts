import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareHigherIsBetter } from "@repo/api/utils";
import { axeScoring } from "../../utils/axeScoring";

export const WCAG2AAA: MetricDescription = {
	id: "wcag2aaa",
	name: "WCAG 2.0 Level AAA",
	description: "",
	unit: Arbitrary.PERCENTAGE,
	compare: createMetricCompareHigherIsBetter(0),
	...axeScoring,
};
