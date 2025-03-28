import {
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import {
	type Row,
	type Table as TableType,
	flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";

type TableProps<TData> = {
	table: TableType<TData>;
	renderExpandedRow?: (row: Row<TData>) => React.ReactNode;
	expandedSpan?: {
		left: number;
		right: number;
	};
};

export const SIZE_AUTO = 9000;
export const SIZE_FR = 8000;

const mapSize = (size: number) => {
	if (size === SIZE_AUTO) {
		return "auto";
	}
	if (size === SIZE_FR) {
		return "1fr";
	}
	return `${size}px`;
};

export function Table<TData>({
	table,
	renderExpandedRow,
	expandedSpan,
}: TableProps<TData>) {
	const columnSizeVars = useMemo(() => {
		const headers = table.getFlatHeaders();
		const colSizes: { [key: string]: number } = {};
		for (let i = 0; i < headers.length; i++) {
			const header = headers[i]!;
			// colSizes[`--header-${header.id}-size`] = header.getSize();
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
				style={{
					gridTemplateColumns: Object.values(columnSizeVars)
						.map(mapSize)
						.join(" "),
				}}
				size="small"
				sx={{
					"& .MuiTableRow-root:last-child > td": { borderBottom: 0 },
					display: "grid",
				}}
			>
				<TableHead sx={{ display: "contents" }}>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow sx={{ display: "contents" }} key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableCell
									component="th"
									key={header.id}
									sx={{ boxSizing: "content-box" }}
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
				<TableBody sx={{ display: "contents" }}>
					{table.getRowModel().rows.map(
						(row) =>
							!row.getIsGrouped() && (
								<>
									<TableRow sx={{ display: "contents" }} key={row.id}>
										{row.getVisibleCells().map((cell, i) => {
											const parentCell = cell.getIsPlaceholder()
												? row.getParentRow()?.getAllCells()[i]
												: undefined;
											// const isFirst = parentCell?.row.subRows[0]?.id === row.id;

											// if (cell.getIsPlaceholder() && !isFirst) {
											// 	return null;
											// }
											const content = cell.getIsPlaceholder()
												? flexRender(
														parentCell?.column.columnDef.cell,
														cell.getContext(),
													)
												: flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													);

											// const placeholderRowSpan =
											// 	cell.getIsPlaceholder() &&
											// 	cell.row.getParentRow()?.subRows.length
											// 		? cell.row.getParentRow()?.subRows.length
											// 		: undefined;

											const expandedRowSpan =
												row.getIsExpanded() &&
												(i < (expandedSpan?.left ?? 0) ||
													i >
														row.getAllCells().length -
															(expandedSpan?.right ?? 0) -
															1)
													? row.getLeafRows().length + 1
													: undefined;
											return (
												<TableCell
													key={cell.id}
													sx={{
														alignContent: "center",
														boxSizing: "content-box",
													}}
													style={{
														borderBottomColor: expandedRowSpan
															? "transparent"
															: undefined,
														gridRow: expandedRowSpan
															? `span ${expandedRowSpan}`
															: undefined,
													}}
													align={cell.column.columnDef.meta?.style?.textAlign}
												>
													{content}
												</TableCell>
											);
										})}
									</TableRow>
									{row.getIsExpanded() &&
										renderExpandedRow &&
										renderExpandedRow(row)}
								</>
							),
					)}
				</TableBody>
			</MuiTable>
		</TableContainer>
	);
}

Table.displayName = "Table";
