import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareHigherIsBetter } from "@repo/api/utils";
import { axeScoring } from "../../utils/axeScoring";

export const BEST_PRACTICE: MetricDescription = {
	id: "best-practice",
	name: "Common accessibility best practices",
	description:
		"Measures adherence to widely accepted accessibility recommendations that enhance usability for people with disabilities beyond formal guidelines.",
	unit: Arbitrary.PERCENTAGE,
	compare: createMetricCompareHigherIsBetter(0),
	...axeScoring,
};
