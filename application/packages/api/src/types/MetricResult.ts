export type MetricResult<TVal extends number | string = number | string> = {
	/**
	 * The ID of the metric
	 *
	 * @example "performance.largest-contentful-paint"
	 */
	id: string;

	/**
	 * The value of the metric
	 */
	value: TVal;
};
