import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";

const P10 = 0.1;
const MEDIAN = 0.25;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const CumulativeLayoutShift: MetricDescription<number> = {
	id: "cumulative-layout-shift",
	name: "Cumulative Layout Shift",
	description:
		"Cumulative Layout Shift (CLS) is a metric that measures the visual stability of a webpage by calculating the total of unexpected layout shifts occurring during a user's session.",
	unit: "",
	compare: createMetricCompareLowerIsBetter(0),
	...lighthouseScoring,
};
