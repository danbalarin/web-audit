import { MetricDescription } from "@repo/api/types";
import { Metric } from "@repo/db";
import { PerformanceCategory } from "@repo/module-performance/metrics";

export const categoriesMap = {
	[PerformanceCategory.id]: PerformanceCategory,
} as const;

export const scoreCategory = (metrics: Metric[], categoryId: string) => {
	const category = categoriesMap[categoryId as keyof typeof categoriesMap];
	if (!category) {
		throw new Error(`Category with id ${categoryId} not found`);
	}
	let score = 0;

	for (const metricName in category.weights) {
		const metric = metrics.find((m) => m.metric === metricName);
		const metricDescription = metricsMap[metric?.metric ?? ""];
		if (!metric || !metricDescription) {
			continue;
		}
		score +=
			metricDescription.score(metric.value) * category.weights[metricName]!;
	}

	return { score, rank: category.rank(score) };
};

export const metricsMap = {
	...PerformanceCategory.metrics.reduce(
		(acc, metric) => {
			acc[metric.id] = metric;
			return acc;
		},
		{} as Record<string, MetricDescription>,
	),
};

export const scoreMetric = (value: Metric) => {
	const metricDescription = metricsMap[value.metric];
	if (!metricDescription) {
		throw new Error(`Metric with id ${value.metric} not found`);
	}
	return {
		score: metricDescription.score(value.value),
		rank: metricDescription.rank(value.value),
	};
};
