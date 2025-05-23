import type { Metric } from "@repo/db";
import type { MetricUnit } from "../metrics";
import type { MetricDescription } from "./MetricDescription";
import type { MetricRank } from "./MetricRank";
import type { ScoreResult } from "./ScoreResult";

export type CategoryDescription<
	TId extends string = string,
	TMetricVal extends string | number = string | number,
	TMetricMeta extends object = object,
> = {
	/**
	 * The ID of the category
	 *
	 * @example "performance"
	 */
	id: TId;

	/**
	 * The name of the category
	 */
	name: string;

	/**
	 * The description of the category
	 *
	 * @example "These encapsulate your web page's performance opportunities."
	 */
	description: string;

	/**
	 * The metrics of the category
	 */
	metrics: MetricDescription<TMetricVal, TMetricMeta>[];

	/**
	 * Rank the category
	 *
	 * @returns "fail" if the value is bad, "average" if the value is average, "good" if the value is good
	 */
	rank: (value: ScoreResult) => MetricRank;

	score: (metrics: Metric[]) => ScoreResult;

	scoreUnit: MetricUnit;

	metricsOrder?: string[];
};
