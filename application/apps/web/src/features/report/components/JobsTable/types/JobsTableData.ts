import { CategoryKeys } from "~/features/report/config/metrics";

export type JobsTableData = {
	[key in CategoryKeys]: {
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
