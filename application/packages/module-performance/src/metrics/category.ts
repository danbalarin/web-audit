import { Arbitrary } from "@repo/api/metrics";
import type { CategoryDescription } from "@repo/api/types";
import { CumulativeLayoutShift } from "./cumulative-layout-shift";
import { FirstContentfulPaint } from "./first-contentful-paint";
import { LargestContentfulPaint } from "./largest-contentful-paint";
import { MaxPotentialFID } from "./max-potential-fid";
import { SpeedIndex } from "./speed-index";
import { TimeToFirstByte } from "./time-to-first-byte";
import { TotalBlockingTime } from "./total-blocking-time";
import { TotalRequests } from "./total-requests";
import { TransferSize } from "./transfer-size";

const weights = {
	[FirstContentfulPaint.id]: 0.1,
	[SpeedIndex.id]: 0.1,
	[LargestContentfulPaint.id]: 0.25,
	[TotalBlockingTime.id]: 0.3,
	[CumulativeLayoutShift.id]: 0.25,
};

const metrics = [
	CumulativeLayoutShift,
	FirstContentfulPaint,
	LargestContentfulPaint,
	MaxPotentialFID,
	SpeedIndex,
	TimeToFirstByte,
	TotalBlockingTime,
	TransferSize,
	TotalRequests,
];

export const PerformanceCategory: CategoryDescription<"performance"> = {
	id: "performance",
	name: "Performance",
	description: "These encapsulate your web page's performance opportunities.",
	metrics,
	scoreUnit: Arbitrary.PERCENTAGE,
	score: (metricsData) => {
		let score = 0;
		let foundMetrics = false;
		for (const metricName in weights) {
			const metric = metricsData.find((m) => m.metric === metricName);
			const metricDescription = metrics.find((m) => m.id === metric?.metric);
			if (!metric || !metricDescription) {
				continue;
			}
			foundMetrics = true;
			score += metricDescription.score(+metric.value) * weights[metricName]!;
		}
		if (!foundMetrics) {
			return { value: -1, status: "not-scored" };
		}

		return { value: score / 100, status: "scored" };
	},
	rank: ({ value }) => {
		if (+value > 0.9) {
			return "good";
		}
		if (+value > 0.5) {
			return "average";
		}
		return "fail";
	},
};
