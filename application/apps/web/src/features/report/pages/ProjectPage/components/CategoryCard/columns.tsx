import { createColumnHelper } from "@tanstack/react-table";

import { CalculatedScore, MetricDescription } from "@repo/api/types";
import { Audit, Metric } from "@repo/db";
import { MetricNameCell } from "~/features/report/components/MetricNameCell";
import { MetricResultCell } from "~/features/report/components/MetricResultCell";

// export type CategoryDetailTableData<TKeys extends string = string> = Record<
// 	MetricKeys,
// 	Record<TKeys, CalculatedScore<MetricDescription>>
// >;

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
				size: 128,
				cell: (info) => (
					<MetricResultCell
						description={info.row.original}
						data={info.getValue()}
					/>
				),
			}),
		),
	];
};
