"use client";
import { Switch } from "@mui/material";
import { EMPTY_INPUT } from "@repo/api/metrics";
import { useUpdateMetric } from "~/features/report/hooks/useUpdateMetric";

type SwitchMetricResultCellProps = {
	value: number;
	metricId?: string;
	projectId?: string;
};

export const SwitchMetricResultCell = ({
	value,
	metricId,
	projectId,
}: SwitchMetricResultCellProps) => {
	const { mutate } = useUpdateMetric({ metricId, projectId });

	return (
		<Switch
			checked={value === EMPTY_INPUT ? false : value === 1}
			disabled={!metricId}
			onChange={(e) => {
				if (!metricId) return;
				mutate({
					id: metricId,
					value: e.target.checked ? "1" : "0",
				});
			}}
		/>
	);
};

SwitchMetricResultCell.displayName = "SwitchMetricResultCell";
