import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { AdditionalData } from "../../types/additionalData";
import { Risk } from "../../types/risk";
import { zapScoring } from "../../utils/zapScoring";

export const ContentSecurityPolicies: MetricDescription<Risk, AdditionalData> =
	{
		id: "content-security-policies",
		name: "Content Security Policies",
		description: "",
		unit: Arbitrary.NUMBER,
		compare: createMetricCompareLowerIsBetter(0),
		...zapScoring,
	};
