import { PerformanceCategory } from "@repo/module-performance/metrics";
import {
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getGroupedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Dispatch, useMemo } from "react";

import { Table } from "~/features/ui/components/Table";
import { RouterOutputs } from "~/server/query/client";

import { scoreCategory } from "../../config/metrics";
import { columns } from "./columns";
import { JobsTableData } from "./types/JobsTableData";

const transformData = (
	jobs: RouterOutputs["projects"]["findById"]["jobs"],
	onDelete?: (auditId: string) => void,
): JobsTableData[] =>
	jobs
		.map((job) =>
			job.audits.map((audit) => ({
				createdAt: job.createdAt,
				jobId: job.id,
				auditId: audit.id,
				url: audit.url,
				performance: scoreCategory(audit.metrics, PerformanceCategory.id),
				accessibility: 69,
				security: 69,
				seo: 69,
				ui: 69,
				onDelete: onDelete ? () => onDelete(audit.id) : undefined,
			})),
		)
		.flat();

const grouping = ["createdAt"];

type JobsTableProps = {
	jobs: RouterOutputs["projects"]["findById"]["jobs"];
	selected: string[];
	onSelectedChange?: Dispatch<string[]>;
	onDelete?: (auditId: string) => void;
};

export const JobsTable = ({
	jobs,
	selected,
	onSelectedChange,
	onDelete,
}: JobsTableProps) => {
	const data = useMemo(() => transformData(jobs, onDelete), [jobs, onDelete]);
	const rowSelection = useMemo(
		() => selected.reduce((acc, s) => ({ ...acc, [s]: true }), {}),
		[selected],
	);
	const onRowSelectionChange = (
		updater: (old: Record<string, boolean>) => Record<string, boolean>,
	) => {
		if (onSelectedChange) {
			const newRowSelection = Object.keys(updater(rowSelection));
			onSelectedChange(newRowSelection);
		}
	};
	const table = useReactTable({
		data,
		columns,
		state: {
			grouping,
			rowSelection,
			expanded: true,
		},
		// @ts-ignore
		onRowSelectionChange,
		enableRowSelection: (row) => row.subRows.length === 0,
		getExpandedRowModel: getExpandedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getRowId: (row) => row.auditId,
	});

	return <Table table={table} />;
};

JobsTable.displayName = "JobsTable";
