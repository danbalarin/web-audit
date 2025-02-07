import "@tanstack/react-table";

declare module "@tanstack/table-core" {
	export interface ColumnMeta<TData extends RowData, TValue> {
		style?: {
			textAlign?: "left" | "center" | "right";
		};
	}
}
