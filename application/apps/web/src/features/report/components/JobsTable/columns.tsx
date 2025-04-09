import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, Icon, IconButton } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { SIZE_AUTO, SIZE_FR } from "~/features/ui/components/Table/Table";
import { categoriesMap } from "../../config/metrics";
import { AuditDateCell } from "../AuditDateCell";
import { MetricResultCell } from "../MetricResultCell";
import type { JobsTableData } from "./types/JobsTableData";

const columnHelper = createColumnHelper<JobsTableData>();

export const columns = [
	columnHelper.accessor("createdAt", {
		header: "Date",
		size: SIZE_AUTO,
		cell: (info) => <AuditDateCell value={info.getValue()} />,
	}),
	columnHelper.accessor("url", {
		header: "URL",
		size: SIZE_AUTO,
		cell: (info) => info.getValue(),
	}),
	...Object.values(categoriesMap).map((category) =>
		columnHelper.accessor(category.id, {
			id: category.id,
			header: category.name,
			size: SIZE_FR,
			cell: (info) => {
				const data = info.getValue();
				return (
					<MetricResultCell
						unit={data.scoreUnit}
						rank={data.rank}
						result={{
							value: data.score.value,
						}}
						renderValue={
							data.score.status === "incomplete"
								? () => "Not all fields are filled"
								: undefined
						}
					/>
				);
			},
		}),
	),
	columnHelper.display({
		id: "selection",
		size: SIZE_AUTO,
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
		size: SIZE_AUTO,
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
