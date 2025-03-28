import { Switch } from "@mui/material";
import { EMPTY_INPUT } from "@repo/api/metrics";

type SwitchMetricResultCellProps = {
	value: number;
	metricId?: string;
	// todo audit id for invalidation
};

export const SwitchMetricResultCell = ({
	value,
	metricId,
}: SwitchMetricResultCellProps) => {
	return (
		<Switch
			checked={value === EMPTY_INPUT ? false : value === 1}
			disabled={!metricId}
		/>
	);
};

SwitchMetricResultCell.displayName = "SwitchMetricResultCell";
