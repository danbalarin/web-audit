import type { ElementType } from "react";

export type AuditMetricDescription<
	TVal extends number | string = number | string,
> = {
	/**
	 * The ID of the metric
	 *
	 * @example "largest-contentful-paint"
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
	 * The description of the metric in MDX
	 */
	document: ElementType;

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
};

export type AuditMetricResult<TVal extends number | string = number | string> =
	{
		/**
		 * The ID of the metric
		 *
		 * @example "largest-contentful-paint"
		 */
		id: string;

		/**
		 * The value of the metric
		 */
		value: TVal;
	};

export type AuditCategoryDescription = {
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
	metrics: AuditMetricDescription[];

	/**
	 * Weights of the metrics
	 */
	weights: Record<string, number>;
};

export type AuditCategoryResult = {
	/**
	 * The ID of the category
	 *
	 * @example "performance"
	 */
	id: string;

	/**
	 * The metrics of the category
	 */
	metrics: AuditMetricResult[];
};

export type AuditResult = {
	/**
	 * ID under which the audit can be found in Redis
	 */
	runId: string;

	/**
	 * The URL that was audited
	 */
	url: string;

	/**
	 * The categories of the audit
	 */
	categories: AuditCategoryResult[];
};
