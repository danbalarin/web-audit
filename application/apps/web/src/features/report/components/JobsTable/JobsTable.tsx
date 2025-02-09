import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getGroupedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Dispatch, useEffect, useMemo, useState } from "react";
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

	const columnSizeVars = useMemo(() => {
		const headers = table.getFlatHeaders();
		const colSizes: { [key: string]: number } = {};
		for (let i = 0; i < headers.length; i++) {
			const header = headers[i]!;
			colSizes[`--header-${header.id}-size`] = header.getSize();
			colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
		}
		return colSizes;
	}, [table.getState().columnSizingInfo, table.getState().columnSizing]);

	return (
		<TableContainer>
			<Table
				style={{ ...columnSizeVars }}
				size="small"
				sx={{ "& .MuiTableRow-root:last-child > td": { borderBottom: 0 } }}
			>
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableCell
									component="th"
									key={header.id}
									style={{
										width: `calc(var(--header-${header?.id}-size) * 1px)`,
									}}
									align={header.column.columnDef.meta?.style?.textAlign}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{table.getRowModel().rows.map(
						(row) =>
							!row.getIsGrouped() && (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell, i) => {
										const parentCell = cell.getIsPlaceholder()
											? row.getParentRow()?.getAllCells()[i]
											: undefined;
										const isFirst = parentCell?.row.subRows[0]?.id === row.id;

										if (cell.getIsPlaceholder() && !isFirst) {
											return null;
										}
										const content = cell.getIsPlaceholder()
											? flexRender(
													parentCell?.column.columnDef.cell,
													cell.getContext(),
												)
											: flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												);
										return (
											<TableCell
												key={cell.id}
												style={{
													width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
													"--row-span": cell.getIsPlaceholder()
														? cell.row.getParentRow()?.subRows.length
														: undefined,
												}}
												align={cell.column.columnDef.meta?.style?.textAlign}
												rowSpan={
													cell.getIsPlaceholder() &&
													cell.row.getParentRow()?.subRows.length
														? cell.row.getParentRow()?.subRows.length
														: undefined
												}
											>
												{content}
											</TableCell>
										);
									})}
								</TableRow>
							),
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

JobsTable.displayName = "JobsTable";
