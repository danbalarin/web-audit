import { type CategoryDescription } from "@repo/api/types";
import { CumulativeLayoutShift } from "./cumulative-layout-shift";
import document from "./description.mdx";
import { FirstContentfulPaint } from "./first-contentful-paint";
import { LargestContentfulPaint } from "./largest-contentful-paint";
import { MaxPotentialFID } from "./max-potential-fid";
import { SpeedIndex } from "./speed-index";
import { TimeToFirstByte } from "./time-to-first-byte";
import { TotalBlockingTime } from "./total-blocking-time";
import { TransferSize } from "./transfer-size";

export const PerformanceCategory: CategoryDescription = {
	id: "performance",
	name: "Performance",
	description: "These encapsulate your web page's performance opportunities.",
	document,
	metrics: [
		CumulativeLayoutShift,
		FirstContentfulPaint,
		LargestContentfulPaint,
		MaxPotentialFID,
		SpeedIndex,
		TimeToFirstByte,
		TotalBlockingTime,
		TransferSize,
	],
	weights: {
		[FirstContentfulPaint.id]: 0.1,
		[SpeedIndex.id]: 0.1,
		[LargestContentfulPaint.id]: 0.25,
		[TotalBlockingTime.id]: 0.3,
		[CumulativeLayoutShift.id]: 0.25,
	},
	rank: (value) => {
		if (value > 90) {
			return "good";
		}
		if (value > 50) {
			return "average";
		}
		return "fail";
	},
};
