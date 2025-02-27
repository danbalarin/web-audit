import { Time } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";

// https://httparchive.org/reports/loading-speed#speedIndex
const P10 = 1700;
const MEDIAN = 3800;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const SpeedIndex: MetricDescription<number> = {
	id: "speed-index",
	name: "Speed Index",
	description:
		"Cumulative Layout Shift (CLS) is a metric that measures the visual stability of a webpage by calculating the total of unexpected layout shifts occurring during a user's session.",
	unit: Time.MILLISECOND,
	compare: createMetricCompareLowerIsBetter(0),
	...lighthouseScoring,
};
