export type JobsTableData = {
	createdAt: Date;
	jobId: string;
	auditId: string;
	url: string;
	performance: { score: number; rank: "good" | "average" | "fail" };
	accessibility: number;
	security: number;
	seo: number;
	ui: number;
	onDelete?: () => void;
};
