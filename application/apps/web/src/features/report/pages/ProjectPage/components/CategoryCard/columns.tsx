import { createColumnHelper } from "@tanstack/react-table";

import { CalculatedScore, MetricDescription } from "@repo/api/types";
import { Audit, Metric } from "@repo/db";
import { MetricDifferenceCell } from "~/features/report/components/MetricDifferenceCell";
import { MetricNameCell } from "~/features/report/components/MetricNameCell";
import { MetricResultCell } from "~/features/report/components/MetricResultCell";

export type CategoryDetailTableData = MetricDescription & {
	data: Record<string, CalculatedScore<Metric>>;
};

export const createColumns = (
	audits: (Omit<Audit, "id"> & { id: string })[],
) => {
	const columnHelper = createColumnHelper<CategoryDetailTableData>();

	return [
		columnHelper.accessor("id", {
			header: "Metric",
			size: 128,
			cell: (info) => <MetricNameCell id={info.getValue()} />,
		}),
		...audits.map((audit) =>
			columnHelper.accessor(`data.${audit.id}`, {
				id: audit.id,
				header: audit.url,
				cell: (info) => {
					const data = info.getValue();
					return (
						<MetricResultCell
							unit={info.row.original.unit}
							rank={data?.rank ?? -1}
							score={data?.score}
							value={data?.value ?? "-1"}
							renderValue={info.row.original.renderValue}
						/>
					);
				},
			}),
		),
		audits.length >= 2 &&
			columnHelper.display({
				id: "comparison",
				header: "Diff",
				size: 128,
				cell: (info) => {
					const metrics = Object.values(info.row.original.data).sort(
						(a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
					);
					return (
						<MetricDifferenceCell
							data={
								metrics.length >= 2 ? [metrics[0]!, metrics.at(-1)!] : undefined
							}
						/>
					);
				},
			}),
	].filter((col) => !!col);
};
