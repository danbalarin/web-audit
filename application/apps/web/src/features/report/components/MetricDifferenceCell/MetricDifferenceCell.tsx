import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import { CalculatedScore } from "@repo/api/types";
import { Metric } from "@repo/db";

import { Stat0Icon } from "~/features/ui/components/Stat0Icon";
import { metricsMap } from "../../config/metrics";

type MetricDifferenceCellProps = {
	data?: [CalculatedScore<Metric>, CalculatedScore<Metric>];
};

export const MetricDifferenceCell = ({ data }: MetricDifferenceCellProps) => {
	const metricDescription = metricsMap[data?.[0]?.metric ?? ""];
	if (!data || data.length < 2 || !metricDescription) {
		return <HorizontalRuleIcon color="primary" />;
	}
	const res = metricDescription.compare(data[0].value, data[1].value);
	if (res === 0) {
		return <Stat0Icon color="primary" />;
	}
	return res > 0 ? (
		<KeyboardDoubleArrowUpIcon color="success" />
	) : (
		<KeyboardDoubleArrowDownIcon color="error" />
	);
};

MetricDifferenceCell.displayName = "MetricDifferenceCell";
