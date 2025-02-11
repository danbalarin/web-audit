import { AuditMetricResult } from "../types";

export const calculateCategoryScore = (
	metrics: AuditMetricResult[],
	weights: Record<string, number>,
) => {
	let score = 0;
	for (const metricId in weights) {
		const weight = weights[metricId]!;
		const metric = metrics.find((metric) => metric.id === metricId);
		if (metric) {
			score += +metric.value * weight;
		} else {
			throw new Error(`Metric with id ${metricId} not found`);
		}
	}
	return score;
};

export const splitMetricsByCategory = (metrics: AuditMetricResult[]) => {
	const categories: Record<
		string,
		{ id: string; metrics: AuditMetricResult[] }
	> = {};
	for (const metric of metrics) {
		if (!categories[metric.id]) {
			categories[metric.id] = { id: metric.id, metrics: [metric] };
		} else {
			categories[metric.id]!.metrics.push(metric);
		}
	}
	return categories;
};
