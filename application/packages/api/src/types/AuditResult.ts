export type AuditMetricDescription = {
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
	shortDescription: string;

	/**
	 * The description of the metric in MDX
	 */
	fullDescription: unknown;

	/**
	 * The unit of the metric
	 *
	 * @example "ms"
	 */
	unit: string;
};

export type AuditMetricResult = {
	/**
	 * The ID of the metric
	 *
	 * @example "largest-contentful-paint"
	 */
	id: string;

	/**
	 * The value of the metric
	 */
	value: number | string;
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
	shortDescription: string;

	/**
	 * The description of the category in MDX
	 */
	fullDescription: unknown;

	/**
	 * The metrics of the category
	 */
	metrics: AuditMetricDescription[];
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
