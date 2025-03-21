import type { CategoryDescription } from "@repo/api/types";

import { Arbitrary } from "@repo/api/metrics";
import { ContentSecurityPolicy } from "./content-security-policy";
import { Cookies } from "./cookies";
import { CrossOriginResourceSharing } from "./cross-origin-resource-sharing";
import { DetectedTechnologies } from "./detected-technologies";
import { SSLCert } from "./ssl-cert";
import { StrictTransportSecurity } from "./strict-transport-security";
import { VulnerableDependencies } from "./vulnerable-dependencies";
import { XFrameOptions } from "./x-frame-options";

const weights = {
	[ContentSecurityPolicy.id]: 1,
	[Cookies.id]: 1,
	[CrossOriginResourceSharing.id]: 0.5,
	[SSLCert.id]: 1,
	[StrictTransportSecurity.id]: 1,
	[VulnerableDependencies.id]: 1,
	[XFrameOptions.id]: 1,
};

const metrics = [
	ContentSecurityPolicy,
	Cookies,
	CrossOriginResourceSharing,
	DetectedTechnologies,
	SSLCert,
	StrictTransportSecurity,
	VulnerableDependencies,
	XFrameOptions,
];

export const SecurityCategory: CategoryDescription<"security"> = {
	id: "security",
	name: "Security",
	description: "Security metrics",
	metrics,
	scoreUnit: Arbitrary.PERCENTAGE,
	score: (metricsData) => {
		let foundMetrics = false;
		const totalWeight = metrics.reduce(
			(acc, metric) => acc + (weights[metric.id] ?? 0),
			0,
		);
		const totalScore = metrics.reduce((acc, metric) => {
			const metricData = metricsData.find((data) => data.metric === metric.id);
			const weight = weights[metric.id] ?? 0;
			if (metricData && weight > 0) {
				foundMetrics = true;
				const metricScore = metric.score(metricData.value);
				return acc + metricScore * weight;
			}
			return acc;
		}, 0);
		if (totalWeight > 0 && foundMetrics) {
			const score = totalScore / totalWeight;
			return score / 100;
		}
		return -1;
	},
	rank: (value) => {
		if (+value > 0.9) {
			return "good";
		}
		if (+value > 0.75) {
			return "average";
		}
		return "fail";
	},
};
