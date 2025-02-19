import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, Icon, IconButton } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { categoriesMap } from "../../config/metrics";
import { AuditDateCell } from "../AuditDateCell";
import { AuditResultCell } from "../AuditResultCell";
import { JobsTableData } from "./types/JobsTableData";

const COLUMN_SIZE = 128;

const columnHelper = createColumnHelper<JobsTableData>();

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
	...Object.values(categoriesMap).map((category) =>
		columnHelper.accessor(category.id, {
			id: category.id,
			header: category.name,
			size: COLUMN_SIZE,
			cell: AuditResultCell,
		}),
	),
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
