import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, Icon, IconButton } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { AuditDateCell } from "../AuditDateCell";
import { AuditResultCell } from "../AuditResultCell";
import { JobsTableData } from "./types/JobsTableData";

const COLUMN_SIZE = 128;

const columnHelper = createColumnHelper<JobsTableData>();

const statusMap = {
	good: "success",
	average: "warning",
	fail: "error",
} as const;

export const columns = [
	columnHelper.accessor("createdAt", {
		header: "Date",
		size: COLUMN_SIZE,
		cell: (info) => <AuditDateCell value={info.getValue()} />,
	}),
	columnHelper.accessor("url", {
		header: "URL",
		size: COLUMN_SIZE,
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("performance", {
		header: "Performance",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell
				value={getValue().score}
				status={statusMap[getValue().rank]}
			/>
		),
	}),
	columnHelper.accessor("accessibility", {
		header: "Accessibility",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell value={getValue()} status="success" />
		),
	}),
	columnHelper.accessor("security", {
		header: "Security",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell value={getValue()} status="success" />
		),
	}),
	columnHelper.accessor("seo", {
		header: "SEO",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell value={getValue()} status="success" />
		),
	}),
	columnHelper.accessor("ui", {
		header: "UI/UX",
		size: COLUMN_SIZE,
		cell: ({ getValue }) => (
			<AuditResultCell value={getValue()} status="success" />
		),
	}),
	columnHelper.display({
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
				<CompareArrowsIcon />
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
	}),
	columnHelper.display({
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
				<DeleteIcon />
			</IconButton>
		),
	}),
];
