import { AuditCategoryDescription } from "@repo/api";
import { LargestContentfulPaint } from "./metrics";

export const PerformanceCategory: AuditCategoryDescription = {
	id: "performance",
	name: "Performance",
	shortDescription:
		"These encapsulate your web page's performance opportunities.",
	fullDescription:
		"These encapsulate your web page's performance opportunities.",
	metrics: [LargestContentfulPaint],
	weights: {
		[LargestContentfulPaint.id]: 1,
	},
};
