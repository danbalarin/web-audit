import {
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getGroupedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { Table } from "~/features/ui/components/Table";
import { RouterOutputs } from "~/server/query/client";
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
				performance: 69,
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
	onSelectedChange?: Dispatch<string[]>;
	onDelete?: (auditId: string) => void;
};

export const JobsTable = ({
	jobs,
	onSelectedChange,
	onDelete,
}: JobsTableProps) => {
	const [rowSelection, setRowSelection] = useState({});
	const data = useMemo(() => transformData(jobs, onDelete), [jobs, onDelete]);
	const table = useReactTable({
		data,
		columns,
		state: {
			grouping,
			rowSelection,
			expanded: true,
		},
		enableRowSelection: (row) => row.subRows.length === 0,
		onRowSelectionChange: setRowSelection,
		getExpandedRowModel: getExpandedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	useEffect(() => {
		if (onSelectedChange) {
			const auditIds = Object.keys(rowSelection)
				.map((index) => data[+index]?.auditId)
				.filter(Boolean) as string[];
			onSelectedChange(auditIds);
		}
	}, [rowSelection]);

	return <Table table={table} />;
};

JobsTable.displayName = "JobsTable";
