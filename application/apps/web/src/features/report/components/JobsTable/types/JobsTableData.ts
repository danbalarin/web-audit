import type { MetricUnit } from "@repo/api/metrics";
import type { MetricRank } from "@repo/api/types";
import type { MouseEventHandler } from "react";
import type { CategoryKeys } from "~/features/report/config/metrics";

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
	onDelete?: MouseEventHandler;
};
