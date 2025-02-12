import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";
import document from "./description.mdx";

const P10 = 800;
const MEDIAN = 1800;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const TimeToFirstByte: MetricDescription<number> = {
	id: "time-to-first-byte",
	name: "Time to First Byte",
	description:
		"Time to First Byte (TTFB) measures the time between a user's web page request and the moment the browser receives the first byte of data from the server.",
	document,
	unit: "ms",
	compare: createMetricCompareLowerIsBetter(10),
	...lighthouseScoring,
};
