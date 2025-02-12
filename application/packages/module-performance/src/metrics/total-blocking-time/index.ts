import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";
import document from "./description.mdx";

const MEDIAN = 600;
const P10 = 200;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const TotalBlockingTime: MetricDescription<number> = {
	id: "total-blocking-time",
	name: "Total Blocking Time",
	description:
		"Total Blocking Time (TBT) measures the total amount of time the browser is blocked by long tasks and unable to respond to user interactions between First Contentful Paint (FCP) and Time to Interactive (TTI).",
	document,
	unit: "ms",
	compare: createMetricCompareLowerIsBetter(10),
	...lighthouseScoring,
};
