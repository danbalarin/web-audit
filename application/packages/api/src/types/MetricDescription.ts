export type MetricDescription<TVal extends number | string = number | string> =
	{
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
		unit: string;

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
		rank(a: TVal): "fail" | "average" | "good";

		/**
		 * Scores the value of the metric
		 *
		 * @returns a score between 0 and 100
		 */
		score(a: TVal): number;
	};
