export const REPORT_ROUTES = {
	BASE: "/project",
	PROJECT: (id: string) => `/project/${id}` as const,
	NEW_PROJECT: "/project/new",
} as const;
