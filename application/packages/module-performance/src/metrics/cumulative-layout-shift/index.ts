import { type AuditMetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "~/utils/getLighthouseScoring";
import document from "./description.mdx";

const P10 = 0.1;
const MEDIAN = 0.25;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const CumulativeLayoutShift: AuditMetricDescription<number> = {
	id: "cumulative-layout-shift",
	name: "Time to First Byte",
	description:
		"Cumulative Layout Shift (CLS) is a metric that measures the visual stability of a webpage by calculating the total of unexpected layout shifts occurring during a user's session.",
	document,
	unit: "",
	compare: createMetricCompareLowerIsBetter(0),
	...lighthouseScoring,
};
