import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";
import document from "./description.mdx";

// https://httparchive.org/reports/loading-speed#speedIndex
const P10 = 1700;
const MEDIAN = 3800;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const SpeedIndex: MetricDescription<number> = {
	id: "speed-index",
	name: "Speed Index",
	description:
		"Cumulative Layout Shift (CLS) is a metric that measures the visual stability of a webpage by calculating the total of unexpected layout shifts occurring during a user's session.",
	document,
	unit: "ms",
	compare: createMetricCompareLowerIsBetter(0),
	...lighthouseScoring,
};
