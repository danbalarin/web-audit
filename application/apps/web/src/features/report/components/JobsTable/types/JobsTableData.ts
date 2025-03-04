import { MetricUnit } from "@repo/api/metrics";
import { CategoryKeys } from "~/features/report/config/metrics";

export type JobsTableData = {
	[key in CategoryKeys]: {
		score: string | number;
		scoreUnit: MetricUnit;
		rank: "good" | "average" | "fail";
	};
} & {
	createdAt: Date;
	jobId: string;
	auditId: string;
	url: string;
	onDelete?: () => void;
};
