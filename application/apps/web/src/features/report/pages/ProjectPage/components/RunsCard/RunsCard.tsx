"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	AccordionDetails,
	AccordionSummary,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import { RoundedAccordion } from "~/features/ui/components/RoundedAccordion";
import { RouterOutputs, trpc } from "~/server/query/client";

type RunsCardProps = {
	projectId: string;
};

type TableData = {
	createdAt: Date;
	jobId: string;
	url: string;
	performance: number;
	accessibility: number;
	security: number;
	seo: number;
	ui: number;
};

const transformData = (
	jobs: RouterOutputs["projects"]["findById"]["jobs"],
): TableData[] =>
	jobs
		.map((job) =>
			job.audits.map((audit) => ({
				createdAt: job.createdAt,
				jobId: job.id,
				url: audit.url,
				performance: Math.round(Math.random() * 100) / 100,
				accessibility: Math.round(Math.random() * 100) / 100,
				security: Math.round(Math.random() * 100) / 100,
				seo: Math.round(Math.random() * 100) / 100,
				ui: Math.round(Math.random() * 100) / 100,
			})),
		)
		.flat();

const columns: ColumnDef<TableData>[] = [
	{
		header: "Date",
		accessorKey: "createdAt",
		cell: (info) => info.getValue()?.toLocaleDateString(),
	},
	{ header: "URL", accessorKey: "url", cell: (info) => info.getValue() },
	{
		header: "Performance",
		accessorKey: "performance",
		cell: ({ getValue }) => `${getValue<number>()}%`,
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => `${getValue<number>()}%`,
	},
	{
		header: "Accessibility",
		accessorKey: "accessibility",
		cell: ({ getValue }) => `${getValue<number>()}%`,
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => `${getValue<number>()}%`,
	},
	{
		header: "Security",
		accessorKey: "security",
		cell: ({ getValue }) => `${getValue<number>()}%`,
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => `${getValue<number>()}%`,
	},
	{
		header: "SEO",
		accessorKey: "seo",
		cell: ({ getValue }) => `${getValue<number>()}%`,
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => `${getValue<number>()}%`,
	},
	{
		header: "UI/UX",
		accessorKey: "ui",
		cell: ({ getValue }) => `${getValue<number>()}%`,
		aggregationFn: "mean",
		aggregatedCell: ({ getValue }) => `${getValue<number>()}%`,
	},
];

export const RunsCard = ({ projectId }: RunsCardProps) => {
	const [project] = trpc.projects.findById.useSuspenseQuery({ id: projectId });
	const data = useMemo(() => transformData(project.jobs), [project]);
	const grouping = useMemo(() => ["createdAt"], []);

	const table = useReactTable({
		data,
		columns,
		state: {
			grouping,
			expanded: true,
		},
		getExpandedRowModel: getExpandedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<RoundedAccordion defaultExpanded>
			<AccordionSummary
				sx={{ boxSizing: "border-box" }}
				expandIcon={<ExpandMoreIcon />}
			>
				<Typography sx={{ width: "33%", flexShrink: 0 }} component="span">
					Runs
				</Typography>
				<Typography sx={{ color: "text.secondary" }}>Selected 0</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<TableContainer>
					<Table>
						<TableHead>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableCell component="th" key={header.id}>
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
							{table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{cell.getIsPlaceholder()
												? null
												: flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</AccordionDetails>
		</RoundedAccordion>
	);
};

RunsCard.displayName = "RunsCard";
