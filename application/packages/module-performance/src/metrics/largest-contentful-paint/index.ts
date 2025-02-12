import { type AuditMetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";
import document from "./description.mdx";

const P10 = 2500;
const MEDIAN = 4000;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const LargestContentfulPaint: AuditMetricDescription<number> = {
	id: "largest-contentful-paint",
	name: "Largest Contentful Paint",
	description:
		"The Largest Contentful Paint (LCP) metric reports the render time of the largest content element visible within the viewport.",
	document,
	unit: "ms",
	compare: createMetricCompareLowerIsBetter(100),
	...lighthouseScoring,
};
