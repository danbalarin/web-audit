import type { MetricUnit } from "../metrics";
import type { MetricRank } from "./MetricRank";
import type { MetricResult } from "./MetricResult";

type RowDefinition = {
	type: "text";
	label: string;
	value: string[];
};

export type MetricDescription<
	TVal extends number | string = number | string,
	TMeta extends object = object,
> = {
	/**
	 * The ID of the metric
	 *
	 * @example "performance.largest-contentful-paint"
	 */
	id: string;

	/**
	 * The name of the metric
	 *
	 * @example "Largest Contentful Paint"
	 */
	name: string;

	/**
	 * The description of the metric
	 *
	 * @example "The Largest Contentful Paint (LCP) metric reports the render time of the largest content element visible within the viewport."
	 */
	description: string;

	/**
	 * The unit of the metric
	 *
	 * @example "ms"
	 */
	unit: MetricUnit;

	/**
	 * Optional function to render the value of the metric, overrides the default
	 */
	renderValue?: (result: Omit<MetricResult<TVal>, "id">) => string;

	/**
	 * Optional function to render the tooltip of the metric, overrides the default
	 */
	renderTooltip?: (result: Omit<MetricResult<TVal>, "id">) => string;

	getDetailRows?: (
		result: (Omit<MetricResult<TVal>, "id"> | null)[],
	) => RowDefinition[];

	/**
	 * Compares two values of the metric
	 *
	 * @returns -1 if a is worse than b, 0 if a roughly equals b, 1 if a is better than b
	 */
	compare(a: TVal, b: TVal): number;

	/**
	 * Ranks the value of the metric
	 *
	 * @returns "fail" if the value is bad, "average" if the value is average, "good" if the value is good
	 */
	rank(a: TVal): MetricRank;

	/**
	 * Scores the value of the metric
	 *
	 * @returns a score between 0 and 100
	 */
	score(a: TVal): number;

	/**
	 * The meta data of the metric
	 *
	 * @deprecated
	 */
	meta?: TMeta;
};
