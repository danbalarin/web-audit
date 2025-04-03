import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";
import InfoIconOutlined from "@mui/icons-material/InfoOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import { Tooltip, Typography } from "@mui/material";

import {
	Arbitrary,
	Input,
	Memory,
	type MetricUnit,
	Time,
} from "@repo/api/metrics";
import type {
	CalculatedScore,
	MetricRank,
	MetricResult,
} from "@repo/api/types";
import type { Metric } from "@repo/db";
import { ImageMetricResultCell } from "./parts/ImageMetricResultCell";
import { MemoryMetricResultCell } from "./parts/MemoryMetricResultCell";
import { NumberInputMetricResultCell } from "./parts/NumberInputMetricResultCell";
import { SwitchMetricResultCell } from "./parts/SwitchMetricResultCell";
import { TimeMetricResultCell } from "./parts/TimeMetricResultCell";

type MetricResultCellProps = {
	projectId?: string;
	metricId?: string;
	unit: MetricUnit;
	score?: CalculatedScore<Metric>["score"];
	rank: CalculatedScore<Metric>["rank"];
	result: Omit<MetricResult, "id">;
	renderValue?: (value: Omit<MetricResult, "id">) => string;
	renderTooltip?: (value: Omit<MetricResult, "id">) => string;
};

const rankIconMap: Record<MetricRank, JSX.Element> = {
	good: <CheckCircleIcon fontSize="small" color="success" />,
	fail: <DangerousIcon fontSize="small" color="error" />,
	average: <WarningIcon fontSize="small" color="warning" />,
	informational: <InfoIconOutlined fontSize="small" color="info" />,
};

export const MetricResultCell = ({
	projectId,
	metricId,
	score,
	rank,
	result,
	unit,
	renderValue,
	renderTooltip,
}: MetricResultCellProps) => {
	const { value } = result;
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
	let hideIcon = false;
	let hideTooltip = false;
	if (renderValue) {
		component = <Typography>{renderValue(result)}</Typography>;
	} else {
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
			case Arbitrary.BOOLEAN:
				component = <Typography>{+value === 1 ? "Yes" : "No"}</Typography>;
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
			case Arbitrary.IMAGE:
				hideIcon = true;
				hideTooltip = true;
				component = (
					<ImageMetricResultCell title="Preview" image={value.toString()} />
				);
				break;
			case Input.BOOLEAN:
				hideIcon = true;
				hideTooltip = true;
				component = (
					<SwitchMetricResultCell
						value={+value}
						metricId={metricId}
						projectId={projectId}
					/>
				);
				break;
			case Input.NUMBER:
				hideIcon = true;
				hideTooltip = true;
				component = (
					<NumberInputMetricResultCell
						value={+value}
						metricId={metricId}
						projectId={projectId}
					/>
				);
				break;
			default:
				component = <Typography>{value}</Typography>;
				break;
		}
	}

	let tooltipContent = undefined;
	if (renderTooltip) {
		tooltipContent = renderTooltip(result);
	} else if (score) {
		tooltipContent = `${score}%`;
	}

	return (
		<Tooltip
			title={!hideTooltip ? tooltipContent : undefined}
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
				{!hideIcon && rankIconMap[rank]}
				{component}
			</Typography>
		</Tooltip>
	);
};

MetricResultCell.displayName = "MetricResultCell";
