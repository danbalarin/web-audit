import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import type { CalculatedScore, CategoryDescription } from "@repo/api/types";
import type { Audit, Metric } from "@repo/db";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import {
	type CategoryKeys,
	type MetricKeys,
	categoriesMap,
} from "~/features/report/config/metrics";
import { RoundedAccordion } from "~/features/ui/components/RoundedAccordion";
import { Table } from "~/features/ui/components/Table";
import { type CategoryDetailTableData, createColumns } from "./columns";

type AuditWithScores = {
	auditId: Audit["id"];
	metricScores: Record<
		CategoryKeys,
		Record<MetricKeys, CalculatedScore<Metric>>
	>;
};

type CategoryCardProps = {
	category: CategoryDescription<CategoryKeys>;
	audits: Audit[];
	metricScores: AuditWithScores[];
};

const transformData = (data: AuditWithScores[], categoryId: CategoryKeys) => {
	const category = categoriesMap[categoryId];
	if (!category) {
		throw new Error(`Category with id ${categoryId} not found`);
	}

	const res = [] as CategoryDetailTableData[];
	for (const metric of category.metrics) {
		res.push({
			...metric,
			data: data.reduce(
				(acc, audit) => {
					const metricScore = audit.metricScores[categoryId]?.[metric.id];
					acc[audit.auditId] = metricScore ?? null;
					return acc;
				},
				{} as CategoryDetailTableData["data"],
			),
		});
	}

	return res;
};

const sortData = (data: CategoryDetailTableData[], order?: string[]) => {
	if (order) {
		return data.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
	}

	return data.sort((a, b) => a.id.localeCompare(b.id));
};

export const CategoryCard = ({
	metricScores,
	audits,
	category,
}: CategoryCardProps) => {
	const columns = useMemo(() => createColumns(audits), [metricScores]);
	const transformedData = useMemo(
		() =>
			sortData(transformData(metricScores, category.id), category.metricsOrder),
		[metricScores],
	);
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
