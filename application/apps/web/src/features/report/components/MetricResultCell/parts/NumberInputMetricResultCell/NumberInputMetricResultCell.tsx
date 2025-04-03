import { Input } from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";

import { EMPTY_INPUT } from "@repo/api/metrics";
import { useEffect, useState } from "react";
import { useUpdateMetric } from "~/features/report/hooks/useUpdateMetric";

type NumberInputMetricResultCellProps = {
	value: number;
	metricId?: string;
	projectId?: string;
};

export const NumberInputMetricResultCell = ({
	value,
	metricId,
	projectId,
}: NumberInputMetricResultCellProps) => {
	const [val, setVal] = useState(value);
	const debouncedValue = useDebounce(val, 1000);
	const { mutate, isPending } = useUpdateMetric(
		{ metricId, projectId },
		{ trpc: { context: { skipBatch: true } } },
	);
	useEffect(() => {
		if (!metricId || debouncedValue === value || isPending) {
			return;
		}
		mutate({
			id: metricId,
			value: Math.max(Math.min(debouncedValue, 100), 0).toString(),
		});
	}, [debouncedValue]);

	return (
		<Input
			slotProps={{ input: { type: "number", min: 0, max: 100 } }}
			value={val === EMPTY_INPUT ? "" : val}
			placeholder="Scale from 0 to 100"
			fullWidth
			disabled={!metricId || isPending}
			onChange={(e) => {
				setVal(e.target.value === "" ? EMPTY_INPUT : +e.target.value);
			}}
		/>
	);
};

NumberInputMetricResultCell.displayName = "NumberInputMetricResultCell";
