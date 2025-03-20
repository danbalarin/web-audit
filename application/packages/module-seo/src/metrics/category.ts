import { type CategoryDescription, MetricDescription } from "@repo/api/types";

import { Arbitrary } from "@repo/api/metrics";
import { SEOMetaTags } from "./seo-meta-tags";
import { TwitterMetaTags } from "./twitter-meta-tags";

const metrics: MetricDescription[] = [SEOMetaTags, TwitterMetaTags];

export const AccessibilityCategory: CategoryDescription<"seo"> = {
	id: "seo",
	name: "SEO",
	description: "Search Engine and Social Media Optimization",
	metrics,
	scoreUnit: Arbitrary.STRING,
	score: (_metricsData) => {
		return -1;
	},
	rank: (_value) => {
		return "informational";
	},
};
