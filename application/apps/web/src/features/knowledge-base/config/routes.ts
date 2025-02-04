export const KNOWLEDGE_BASE_ROUTES = {
	BASE: "/knowledge-base",
	CATEGORY: (category: string) => `/knowledge-base/${category}`,
	METRIC: (category: string, metric: string) =>
		`/knowledge-base/${category}/${metric}`,
};
