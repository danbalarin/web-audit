import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";

const P10 = 23;
const MEDIAN = 75;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const TotalRequests: MetricDescription<number> = {
	id: "total-requests",
	name: "Total Requests",
	description:
		"The total number of requests made by the page. A high number of requests can slow down page load time.",
	unit: Arbitrary.NUMBER,
	compare: createMetricCompareLowerIsBetter(2),
	...lighthouseScoring,
};
