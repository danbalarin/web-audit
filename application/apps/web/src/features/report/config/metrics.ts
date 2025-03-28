import type { MetricUnit } from "@repo/api/metrics";
import type {
	CalculatedScore,
	CategoryDescription,
	MetricDescription,
} from "@repo/api/types";
import type { Metric } from "@repo/db";
import { AccessibilityCategory } from "@repo/module-accessibility/metrics";
import { PerformanceCategory } from "@repo/module-performance/metrics";
import { SecurityCategory } from "@repo/module-security/metrics";
import { SEOCategory } from "@repo/module-seo/metrics";
import { UsabilityCategory } from "@repo/module-usability/metrics";

export const categoriesMap = {
	[PerformanceCategory.id]: PerformanceCategory,
	[AccessibilityCategory.id]: AccessibilityCategory,
	[SecurityCategory.id]: SecurityCategory,
	[SEOCategory.id]: SEOCategory,
	[UsabilityCategory.id]: UsabilityCategory,
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
): CalculatedScore<object> & { scoreUnit: MetricUnit } => {
	const category = categoriesMap[categoryId as CategoryKeys];
	if (!category) {
		throw new Error(`Category with id ${categoryId} not found`);
	}

	const score = category.score(metrics);
	return { score, rank: category.rank(score), scoreUnit: category.scoreUnit };
};

export const metricsMap = Object.values(categoriesMap)
	.flatMap((c) => c.metrics)
	.reduce(
		(acc, metric) => {
			acc[metric.id] = metric;
			return acc;
		},
		{} as Record<string, MetricDescription>,
	);

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
			[metric.category]: {
				...(acc?.[metric.category as CategoryKeys] || {}),
				[metric.metric]: { ...metric, ...scoreMetric(metric) },
			},
		}),
		{} as Record<CategoryKeys, Record<MetricKeys, CalculatedScore<Metric>>>,
	);
	return { categoryScores, metricScores };
};
