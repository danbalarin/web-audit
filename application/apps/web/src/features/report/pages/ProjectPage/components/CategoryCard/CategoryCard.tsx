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

const transformData = (data: AuditWithScores[], category: CategoryKeys) => {
	const res = [] as CategoryDetailTableData[];

	for (const audit of data) {
		for (const metric in audit.metricScores[category]) {
			const existing = res.find((r) => r.id === metric);
			if (!existing) {
				const metricDescription = metricsMap[metric];
				if (!metricDescription) {
					continue;
				}
				res.push({
					...metricDescription,
					data: {
						[audit.auditId]: audit.metricScores[category][metric]!,
					},
				});
			} else {
				existing.data[audit.auditId] = audit.metricScores[category][metric]!;
			}
		}
	}

	return res.sort((a, b) => a.id.localeCompare(b.id));
};

export const CategoryCard = ({
	metricScores,
	audits,
	category,
}: CategoryCardProps) => {
	const columns = useMemo(() => createColumns(audits), [metricScores]);
	const transformedData = useMemo(
		() => transformData(metricScores, category.id),
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
