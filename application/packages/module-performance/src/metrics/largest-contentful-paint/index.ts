import { type AuditMetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import document from "./description.mdx";

export const LargestContentfulPaint: AuditMetricDescription<number> = {
	id: "largest-contentful-paint",
	name: "Largest Contentful Paint",
	description:
		"The Largest Contentful Paint (LCP) metric reports the render time of the largest content element visible within the viewport.",
	document,
	unit: "ms",
	compare: createMetricCompareLowerIsBetter(100),
	rank: (value) => {
		if (value <= 2500) {
			return "good";
		}

		if (value <= 4000) {
			return "average";
		}

		return "fail";
	},
};
