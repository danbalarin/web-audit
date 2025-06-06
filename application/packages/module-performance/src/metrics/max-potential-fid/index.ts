import { Time } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";

const P10 = 100;
const MEDIAN = 250;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const MaxPotentialFID: MetricDescription = {
	id: "max-potential-fid",
	name: "Max Potential First Input Delay",
	description:
		"Max Potential First Input Delay measures the longest duration of main thread blockage during a webpage's load process, representing the maximum potential delay a user might experience before the browser responds to their first interaction.",
	unit: Time.MILLISECOND,
	compare: createMetricCompareLowerIsBetter(10),
	...lighthouseScoring,
};
