import { CompareArrows, Delete } from "@mui/icons-material";
import { Checkbox, Icon, IconButton } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { AuditDateCell } from "../AuditDateCell";
import { AuditResultCell } from "../AuditResultCell";
import { JobsTableData } from "./types/JobsTableData";

const COLUMN_SIZE = 128;

export const columns: ColumnDef<JobsTableData>[] = [
	{
		header: "Date",
		accessorKey: "createdAt",
		size: COLUMN_SIZE,
		cell: (info) => <AuditDateCell value={info.getValue<Date>()} />,
	},
	{
		header: "URL",
		accessorKey: "url",
		size: 280,
		cell: (info) => info.getValue(),
	},
	{
		header: "Performance",
		accessorKey: "performance",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
	},
	{
		header: "Accessibility",
		accessorKey: "accessibility",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
	},
	{
		header: "Security",
		accessorKey: "security",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
	},
	{
		header: "SEO",
		accessorKey: "seo",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
	},
	{
		header: "UI/UX",
		accessorKey: "ui",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => (
			<AuditResultCell value={getValue<number>()} status="success" />
		),
	},
	{
		id: "selection",
		size: 42,
		maxSize: 42,
		minSize: 42,
		meta: {
			style: {
				textAlign: "center",
			},
		},
		header: () => (
			<Icon>
				<CompareArrows />
			</Icon>
		),
		cell: ({ row }) =>
			row.subRows.length === 0 && (
				<Checkbox
					checked={row.getIsSelected()}
					disabled={!row.getCanSelect()}
					indeterminate={row.getIsSomeSelected()}
					onChange={row.getToggleSelectedHandler()}
				/>
			),
	},
	{
		id: "delete",
		size: 42,
		maxSize: 42,
		minSize: 42,
		meta: {
			style: {
				textAlign: "center",
			},
		},
		cell: ({ row }) => (
			<IconButton
				onClick={row.original.onDelete}
				color="error"
				disabled={!row.original.onDelete}
			>
				<Delete />
			</IconButton>
		),
	},
];
