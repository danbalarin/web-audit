"use client";
import { AuditMetricDescription } from "@repo/api";
import description from "./description.mdx";

export const LargestContentfulPaint: AuditMetricDescription = {
	id: "largest-contentful-paint",
	name: "Largest Contentful Paint",
	shortDescription:
		"The Largest Contentful Paint (LCP) metric reports the render time of the largest content element visible within the viewport.",
	fullDescription: description,
	unit: "ms",
};
