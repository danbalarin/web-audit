import { MetricUnit } from "@repo/api/metrics";
import { MetricRank } from "@repo/api/types";
import { CategoryKeys } from "~/features/report/config/metrics";

export type JobsTableData = {
	[key in CategoryKeys]: {
		score: string | number;
		scoreUnit: MetricUnit;
		rank: MetricRank;
	};
} & {
	createdAt: Date;
	jobId: string;
	auditId: string;
	url: string;
	onDelete?: () => void;
};
