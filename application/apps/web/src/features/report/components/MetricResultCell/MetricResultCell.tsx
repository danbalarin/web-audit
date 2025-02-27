import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";
import WarningIcon from "@mui/icons-material/Warning";
import { Tooltip, Typography } from "@mui/material";

import { Memory, Time } from "@repo/api/metrics";
import { CalculatedScore, MetricDescription } from "@repo/api/types";
import { Metric } from "@repo/db";
import { MemoryMetricResultCell } from "./parts/MemoryMetricResultCell";
import { TimeMetricResultCell } from "./parts/TimeMetricResultCell";

type MetricResultCellProps = {
	description: MetricDescription;
	data: CalculatedScore<Metric>;
};

export const MetricResultCell = ({
	data,
	description,
}: MetricResultCellProps) => {
	if (!data || data.value === "-1") {
		return (
			<Tooltip
				title="No data were retrieved for this metric"
				placement="bottom-start"
			>
				<Typography>Not scored</Typography>
			</Tooltip>
		);
	}
	let component;
	switch (description.unit) {
		case Time.MILLISECOND:
		case Time.SECOND:
		case Time.MINUTE:
			component = <TimeMetricResultCell value={+data.value} />;
			break;
		case Memory.BYTE:
		case Memory.KILOBYTE:
		case Memory.MEGABYTE:
		case Memory.GIGABYTE:
			component = <MemoryMetricResultCell value={+data.value} />;
			break;
		default:
			component = <Typography>{data.value}</Typography>;
	}

	const color =
		data.rank === "good"
			? "success"
			: data.rank === "fail"
				? "error"
				: "warning";
	return (
		<Tooltip title={Math.round(data.score) + "%"} placement="bottom-start">
			<Typography
				component={"span"}
				variant="body1"
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
				}}
			>
				{data.rank === "good" ? (
					<CheckCircleIcon fontSize="small" color={color} />
				) : data.rank === "fail" ? (
					<DangerousIcon fontSize="small" color={color} />
				) : (
					<WarningIcon fontSize="small" color={color} />
				)}
				{component}
			</Typography>
		</Tooltip>
	);
};

MetricResultCell.displayName = "MetricResultCell";
