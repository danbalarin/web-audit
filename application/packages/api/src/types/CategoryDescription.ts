import { Metric } from "@repo/db";
import { MetricUnit } from "../metrics";
import { MetricDescription } from "./MetricDescription";
import { MetricRank } from "./MetricRank";

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
	rank: (value: string | number) => MetricRank;

	score: (metrics: Metric[]) => string | number;

	scoreUnit: MetricUnit;

	metricsOrder?: string[];
};
