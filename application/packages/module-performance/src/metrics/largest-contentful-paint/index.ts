import { Time } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";

const P10 = 2500;
const MEDIAN = 4000;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const LargestContentfulPaint: MetricDescription = {
	id: "largest-contentful-paint",
	name: "Largest Contentful Paint",
	description:
		"The Largest Contentful Paint (LCP) metric reports the render time of the largest content element visible within the viewport.",
	unit: Time.MILLISECOND,
	compare: createMetricCompareLowerIsBetter(100),
	...lighthouseScoring,
};
