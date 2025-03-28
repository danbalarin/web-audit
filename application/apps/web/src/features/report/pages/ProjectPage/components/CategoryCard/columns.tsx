import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";

import type { CalculatedScore, MetricDescription } from "@repo/api/types";
import type { Audit, Metric } from "@repo/db";

import { MetricDifferenceCell } from "~/features/report/components/MetricDifferenceCell";
import { MetricNameCell } from "~/features/report/components/MetricNameCell";
import { MetricResultCell } from "~/features/report/components/MetricResultCell";
import { SIZE_FR } from "~/features/ui/components/Table/Table";

export type CategoryDetailTableData = MetricDescription & {
	data: Record<string, CalculatedScore<Metric> | null>;
};

export const createColumns = (
	audits: (Omit<Audit, "id"> & { id: string })[],
) => {
	const columnHelper = createColumnHelper<CategoryDetailTableData>();

	return [
		columnHelper.display({
			id: "expander",
			header: "",
			size: 64,
			cell: ({ row }) => {
				return row.getCanExpand() ? (
					<IconButton onClick={row.getToggleExpandedHandler()} size="small">
						{row.getIsExpanded() ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</IconButton>
				) : null;
			},
		}),
		columnHelper.accessor("id", {
			header: "Metric",
			size: SIZE_FR,
			cell: (info) => <MetricNameCell id={info.getValue()} />,
		}),
		...audits.map((audit) =>
			columnHelper.accessor(`data.${audit.id}`, {
				id: audit.id,
				header: audit.url,
				size: SIZE_FR,
				cell: (info) => {
					const data = info.getValue();
					return (
						<MetricResultCell
							projectId={info.table.options.meta?.projectId}
							metricId={data?.id}
							unit={info.row.original.unit}
							rank={data?.rank ?? "informational"}
							score={data?.score}
							result={{
								value: data?.value ?? "-1",
								additionalData: data?.additionalData ?? undefined,
							}}
							renderValue={info.row.original.renderValue}
							renderTooltip={info.row.original.renderTooltip}
						/>
					);
				},
			}),
		),
		audits.length >= 2 &&
			columnHelper.display({
				id: "comparison",
				header: "Diff",
				size: 64,
				cell: (info) => {
					const metrics = Object.values(info.row.original.data).sort(
						(a, b) =>
							(a?.createdAt?.getTime() ?? 0) - (b?.createdAt?.getTime() ?? 0),
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
