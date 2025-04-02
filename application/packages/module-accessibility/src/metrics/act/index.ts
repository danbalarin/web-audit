import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareHigherIsBetter } from "@repo/api/utils";
import { axeScoring } from "../../utils/axeScoring";

export const ACT: MetricDescription = {
	id: "act",
	name: "W3C approved Accessibility Conformance Testing rules",
	description:
		"Evaluates compliance with W3C's officially approved ACT Rules, which provide standardized testing procedures for specific accessibility criteria.",
	unit: Arbitrary.PERCENTAGE,
	compare: createMetricCompareHigherIsBetter(0),
	...axeScoring,
};
