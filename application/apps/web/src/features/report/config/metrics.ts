import {
	CalculatedScore,
	CategoryDescription,
	MetricDescription,
} from "@repo/api/types";
import { Metric } from "@repo/db";
import { PerformanceCategory } from "@repo/module-performance/metrics";

export const categoriesMap = {
	[PerformanceCategory.id]: PerformanceCategory,
} as const;

export type CategoryKeys = keyof typeof categoriesMap;

export type MetricKeys = keyof typeof metricsMap;

export const getMetricCategory = (metricId: string) => {
	for (const category of Object.values(categoriesMap)) {
		if (category.metrics.find((m) => m.id === metricId)) {
			return category;
		}
	}
	return null;
};

export const scoreCategory = (
	metrics: Metric[],
	categoryId: string,
): CalculatedScore<object> => {
	const category = categoriesMap[categoryId as CategoryKeys];
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

export const scoreMetric = (value: Metric): CalculatedScore<object> => {
	const metricDescription = metricsMap[value.metric];
	if (!metricDescription) {
		return { score: -1, rank: "fail" };
	}
	return {
		score: metricDescription.score(value.value),
		rank: metricDescription.rank(value.value),
	};
};

export const scoreAndSplitMetrics = (metrics: Metric[]) => {
	const categoryScores = Object.entries(categoriesMap).reduce(
		(acc, [id, category]) => ({
			...acc,
			[id]: { ...category, ...scoreCategory(metrics, id) },
		}),
		{} as Record<CategoryKeys, CalculatedScore<CategoryDescription>>,
	);
	const metricScores = metrics.reduce(
		(acc, metric) => ({
			...acc,
			[metric.metric]: { ...metric, ...scoreMetric(metric) },
		}),
		{} as Record<CategoryKeys, CalculatedScore<Metric>>,
	);
	return { categoryScores, metricScores };
};
