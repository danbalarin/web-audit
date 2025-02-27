import { convertMemory } from "@repo/api/metrics";

type MemoryMetricResultCellProps = {
	value: number;
};

export const MemoryMetricResultCell = ({
	value,
}: MemoryMetricResultCellProps) => {
	const { memory, unit } = convertMemory(value);
	return (
		<span>
			{memory.toFixed(2)} {unit}
		</span>
	);
};

MemoryMetricResultCell.displayName = "MemoryMetricResultCell";
