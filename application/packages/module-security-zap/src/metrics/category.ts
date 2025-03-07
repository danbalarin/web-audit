import { type CategoryDescription } from "@repo/api/types";

import { Arbitrary } from "@repo/api/metrics";
import { ContentSecurityPolicies } from "./content-security-policies";

import type { AdditionalData } from "../types/additionalData";
import { Confidence } from "../types/confidence";
import { Risk } from "../types/risk";

const metrics = [ContentSecurityPolicies];

export const SecurityCategory: CategoryDescription<"security", AdditionalData> =
	{
		id: "security",
		name: "Security",
		description: "Security metrics",
		metrics,
		scoreUnit: Arbitrary.STRING,
		score: (metricsData) => {
			const data = metricsData.filter((m) => m.category === "security");

			if (data.length === 0) {
				return "No problems";
			}

			const splittedAlerts = data.map((metric) => ({
				count: metric.value,
				risk: metric.additionalData?.alerts[0]?.risk,
				confidence: metric.additionalData?.alerts[0]?.confidence,
			}));

			const aggregated = splittedAlerts.reduce(
				(acc, { risk, confidence }) => {
					if (
						!risk ||
						!confidence ||
						confidence === Confidence.Low ||
						confidence === Confidence.Undefined ||
						risk === Risk.Undefined ||
						risk === Risk.Informational
					) {
						return acc;
					}
					if (!acc[risk]) {
						acc[risk] = 0;
					}
					acc[risk] += 1;
					return acc;
				},
				{} as Record<Risk, number>,
			);

			return Object.entries(aggregated)
				.map(([risk, count]) => `${risk}: ${count}`)
				.join(", ");
		},
		rank: (value) => {
			if (value.toString().includes(Risk.High)) {
				return "fail";
			}
			if (
				value.toString().includes(Risk.Medium) ||
				value.toString().includes(Risk.Low)
			) {
				return "average";
			}
			return "good";
		},
	};
