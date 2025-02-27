import { MetricDescription } from "./MetricDescription";

export type CategoryDescription<TId extends string = string> = {
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
	metrics: MetricDescription[];

	/**
	 * Weights of the metrics
	 */
	weights: Record<string, number>;

	/**
	 * Rank the category
	 *
	 * @returns "fail" if the value is bad, "average" if the value is average, "good" if the value is good
	 */
	rank: (value: number) => "fail" | "average" | "good";
};
