import type { CategoryDescription, MetricDescription } from "@repo/api/types";

import { Arbitrary } from "@repo/api/metrics";
import { FacebookPreview } from "./facebook-preview";
import { OpenGraphMetaTags } from "./open-graph-meta-tags";
import { SEOMetaTags } from "./seo-meta-tags";
import { TwitterMetaTags } from "./twitter-meta-tags";
import { TwitterPreview } from "./twitter-preview";

const weights = {
	[SEOMetaTags.id]: 1,
	[TwitterMetaTags.id]: 0.5,
	[OpenGraphMetaTags.id]: 0.5,
};

const sumWeights = Object.values(weights).reduce((a, b) => a + b, 0);

const metricsOrder = [
	SEOMetaTags.id,
	TwitterMetaTags.id,
	OpenGraphMetaTags.id,
	FacebookPreview.id,
	TwitterPreview.id,
];

const metrics: MetricDescription[] = [
	SEOMetaTags,
	TwitterMetaTags,
	OpenGraphMetaTags,
	FacebookPreview,
	TwitterPreview,
];

export const SEOCategory: CategoryDescription<"seo"> = {
	id: "seo",
	name: "SEO",
	description: "Search Engine and Social Media Optimization",
	metrics,
	scoreUnit: Arbitrary.PERCENTAGE,
	metricsOrder,
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
			return -1;
		}

		return score / sumWeights;
	},
	rank: (value) => {
		if (+value > 0.8) {
			return "good";
		}
		if (+value > 0.5) {
			return "average";
		}
		return "fail";
	},
};
