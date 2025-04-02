import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareHigherIsBetter } from "@repo/api/utils";
import { axeScoring } from "../../utils/axeScoring";

export const WCAG22AA: MetricDescription = {
	id: "wcag22aa",
	name: "WCAG 2.2 Level AA",
	description:
		"Assesses compliance with the latest WCAG 2.2 Level AA guidelines, which expand previous versions with additional criteria for cognitive accessibility and mobile interfaces.",
	unit: Arbitrary.PERCENTAGE,
	compare: createMetricCompareHigherIsBetter(0),
	...axeScoring,
};
