import { type AuditCategoryDescription } from "@repo/api/types";
import description from "./description.mdx";
import { LargestContentfulPaint } from "./largest-contentful-paint";

export const PerformanceCategory: AuditCategoryDescription = {
	id: "performance",
	name: "Performance",
	shortDescription:
		"These encapsulate your web page's performance opportunities.",
	fullDescription: description,
	metrics: [LargestContentfulPaint],
	weights: {
		[LargestContentfulPaint.id]: 1,
	},
};
