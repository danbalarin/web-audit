export type JobsTableData = {
	createdAt: Date;
	jobId: string;
	auditId: string;
	url: string;
	performance: number;
	accessibility: number;
	security: number;
	seo: number;
	ui: number;
	onDelete?: () => void;
};
