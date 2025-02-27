import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import type { CalculatedScore, CategoryDescription } from "@repo/api/types";
import { Audit, Metric } from "@repo/db";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import {
	CategoryKeys,
	MetricKeys,
	metricsMap,
} from "~/features/report/config/metrics";
import { RoundedAccordion } from "~/features/ui/components/RoundedAccordion";
import { Table } from "~/features/ui/components/Table";
import { CategoryDetailTableData, createColumns } from "./columns";

type AuditWithScores = Audit & {
	categoryScores: Record<CategoryKeys, CalculatedScore<CategoryDescription>>;
	metricScores: Record<MetricKeys, CalculatedScore<Metric>>;
};

type CategoryCardProps = {
	category: CategoryDescription;
	data: AuditWithScores[];
};

const transformData = (data: AuditWithScores[]) => {
	const res = [] as CategoryDetailTableData[];

	for (const audit of data) {
		for (const metric in audit.metricScores) {
			const existing = res.find((r) => r.id === metric);
			if (!existing) {
				const metricDescription = metricsMap[metric];
				if (!metricDescription) {
					console.log("metric", metric);
					continue;
				}
				res.push({
					...metricDescription,
					data: {
						[audit.id]: audit.metricScores[metric]!,
					},
				});
			} else {
				existing.data[audit.id] = audit.metricScores[metric]!;
			}
		}
	}

	return res.sort((a, b) => a.id.localeCompare(b.id));
};

export const CategoryCard = ({ data, category }: CategoryCardProps) => {
	const columns = useMemo(() => createColumns(data), [data]);
	const transformedData = useMemo(() => transformData(data), [data]);
	const table = useReactTable({
		data: transformedData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.id,
	});
	return (
		<RoundedAccordion defaultExpanded>
			<AccordionSummary
				sx={{ boxSizing: "border-box", position: "relative" }}
				expandIcon={<ExpandMoreIcon />}
			>
				<Typography>{category.name}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Table table={table} />
			</AccordionDetails>
		</RoundedAccordion>
	);
};

CategoryCard.displayName = "CategoryCard";
