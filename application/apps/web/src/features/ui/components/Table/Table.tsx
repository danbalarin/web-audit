import {
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { type Table as TableType, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";

type TableProps<TData> = {
	table: TableType<TData>;
};

export function Table<TData>({ table }: TableProps<TData>) {
	const columnSizeVars = useMemo(() => {
		const headers = table.getFlatHeaders();
		const colSizes: { [key: string]: number } = {};
		for (let i = 0; i < headers.length; i++) {
			const header = headers[i]!;
			colSizes[`--header-${header.id}-size`] = header.getSize();
			colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
		}
		return colSizes;
	}, [
		table.getState().columnSizingInfo,
		table.getState().columnSizing,
		table.getAllColumns().length,
	]);

	return (
		<TableContainer>
			<MuiTable
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
			</MuiTable>
		</TableContainer>
	);
}

Table.displayName = "Table";
