import { Time } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";
import document from "./description.mdx";

// https://httparchive.org/reports/loading-speed#fcp
const P10 = 1000;
const MEDIAN = 2100;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const FirstContentfulPaint: MetricDescription<number> = {
	id: "first-contentful-paint",
	name: "First Contentful Paint",
	description:
		"Cumulative Layout Shift (CLS) is a metric that measures the visual stability of a webpage by calculating the total of unexpected layout shifts occurring during a user's session.",
	document,
	unit: Time.MILLISECOND,
	compare: createMetricCompareLowerIsBetter(0),
	...lighthouseScoring,
};
