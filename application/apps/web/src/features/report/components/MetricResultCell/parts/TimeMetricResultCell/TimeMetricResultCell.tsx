import { convertTime } from "@repo/api/metrics";

type TimeMetricResultCellProps = {
	value: number;
};

export const TimeMetricResultCell = ({ value }: TimeMetricResultCellProps) => {
	const { time, unit } = convertTime(value);
	return (
		<span>
			{time.toFixed(2)} {unit}
		</span>
	);
};

TimeMetricResultCell.displayName = "TimeMetricResultCell";
