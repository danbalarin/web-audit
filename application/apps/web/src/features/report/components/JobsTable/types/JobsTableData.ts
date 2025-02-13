import { categoriesMap } from "~/features/report/config/metrics";

export type JobsTableData = {
	[key in keyof typeof categoriesMap]: {
		score: number;
		rank: "good" | "average" | "fail";
	};
} & {
	createdAt: Date;
	jobId: string;
	auditId: string;
	url: string;
	onDelete?: () => void;
};
