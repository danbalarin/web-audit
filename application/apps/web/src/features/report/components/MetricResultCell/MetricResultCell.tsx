import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";
import WarningIcon from "@mui/icons-material/Warning";
import { Typography } from "@mui/material";

import { Time } from "@repo/api/metrics";
import { CalculatedScore, MetricDescription } from "@repo/api/types";
import { Metric } from "@repo/db";
import { TimeMetricResultCell } from "./parts/TimeMetricResultCell";

type MetricResultCellProps = {
	description: MetricDescription;
	data: CalculatedScore<Metric>;
};

export const MetricResultCell = ({
	data,
	description,
}: MetricResultCellProps) => {
	if (!data) {
		return null;
	}
	let component;
	if (description.unit === Time.MILLISECOND) {
		component = <TimeMetricResultCell value={+data.value} />;
	}

	const color =
		data.rank === "good"
			? "success"
			: data.rank === "fail"
				? "error"
				: "warning";
	return (
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
	);
};

MetricResultCell.displayName = "MetricResultCell";
