import { ElementType } from "react";
import { MetricDescription } from "./MetricDescription";

export type CategoryDescription = {
	/**
	 * The ID of the category
	 *
	 * @example "performance"
	 */
	id: string;

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
	 * The description of the category in MDX
	 */
	document: ElementType;

	/**
	 * The metrics of the category
	 */
	metrics: MetricDescription[];

	/**
	 * Weights of the metrics
	 */
	weights: Record<string, number>;
};
