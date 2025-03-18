import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";
import InfoIconOutlined from "@mui/icons-material/InfoOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import { Tooltip, Typography } from "@mui/material";

import { Arbitrary, Memory, MetricUnit, Time } from "@repo/api/metrics";
import { CalculatedScore, MetricRank } from "@repo/api/types";
import { Metric } from "@repo/db";
import { MemoryMetricResultCell } from "./parts/MemoryMetricResultCell";
import { TimeMetricResultCell } from "./parts/TimeMetricResultCell";

type MetricResultCellProps = {
	unit: MetricUnit;
	score?: CalculatedScore<Metric>["score"];
	rank: CalculatedScore<Metric>["rank"];
	value: number | string;
};

const rankIconMap: Record<MetricRank, JSX.Element> = {
	good: <CheckCircleIcon fontSize="small" color="success" />,
	fail: <DangerousIcon fontSize="small" color="error" />,
	average: <WarningIcon fontSize="small" color="warning" />,
	informational: <InfoIconOutlined fontSize="small" color="info" />,
};

export const MetricResultCell = ({
	score,
	rank,
	value,
	unit,
}: MetricResultCellProps) => {
	if (+value === -1) {
		return (
			<Tooltip
				title="No data were retrieved for this metric"
				placement="bottom-start"
			>
				<Typography
					component={"span"}
					variant="body1"
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
					}}
				>
					{rankIconMap.informational}
					<Typography>Not scored</Typography>
				</Typography>
			</Tooltip>
		);
	}
	let component;
	switch (unit) {
		case Time.MILLISECOND:
		case Time.SECOND:
		case Time.MINUTE:
			component = <TimeMetricResultCell value={+value} />;
			break;
		case Memory.BYTE:
		case Memory.KILOBYTE:
		case Memory.MEGABYTE:
		case Memory.GIGABYTE:
			component = <MemoryMetricResultCell value={+value} />;
			break;
		case Arbitrary.PERCENTAGE:
			component = <Typography>{Math.round(+value * 100) + "%"}</Typography>;
			break;
		case Arbitrary.NUMBER:
			component = (
				<Typography>
					{+value === 0
						? +value
						: Math.max(Math.round(+value * 100) / 100, 0.01)}
				</Typography>
			);
			break;
		default:
			component = <Typography>{value}</Typography>;
			break;
	}

	return (
		<Tooltip
			title={score ? Math.round(+score) + "%" : undefined}
			placement="bottom-start"
		>
			<Typography
				component={"span"}
				variant="body1"
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
				}}
			>
				{rankIconMap[rank]}
				{component}
			</Typography>
		</Tooltip>
	);
};

MetricResultCell.displayName = "MetricResultCell";
