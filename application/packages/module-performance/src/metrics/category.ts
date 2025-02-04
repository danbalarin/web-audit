import { type AuditCategoryDescription } from "@repo/api/types";
import document from "./description.mdx";
import { LargestContentfulPaint } from "./largest-contentful-paint";

export const PerformanceCategory: AuditCategoryDescription = {
	id: "performance",
	name: "Performance",
	description: "These encapsulate your web page's performance opportunities.",
	document,
	metrics: [LargestContentfulPaint],
	weights: {
		[LargestContentfulPaint.id]: 1,
	},
};
