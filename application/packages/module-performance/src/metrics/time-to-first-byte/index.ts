import { Time } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";

const P10 = 200;
const MEDIAN = 600;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const TimeToFirstByte: MetricDescription = {
	id: "time-to-first-byte",
	name: "Time to First Byte",
	description:
		"Time to First Byte (TTFB) measures the time between a user's web page request and the moment the browser receives the first byte of data from the server.",
	unit: Time.MILLISECOND,
	compare: createMetricCompareLowerIsBetter(10),
	...lighthouseScoring,
};
