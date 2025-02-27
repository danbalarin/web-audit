import { Memory } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { getLighthouseScoring } from "../../utils/getLighthouseScoring";
import document from "./description.mdx";

// https://httparchive.org/reports/state-of-the-web#bytesTotal
const MEDIAN = 2600 * 1024;
const P10 = 600 * 1024;

const lighthouseScoring = getLighthouseScoring(MEDIAN, P10);

export const TransferSize: MetricDescription<number> = {
	id: "transfer-size",
	name: "Transfer Size",
	description:
		"Transfer Size measures the total bytes transferred from the server to the browser for all the requested files when loading a webpage.",
	document,
	unit: Memory.BYTE,
	compare: createMetricCompareLowerIsBetter(150),
	...lighthouseScoring,
};
