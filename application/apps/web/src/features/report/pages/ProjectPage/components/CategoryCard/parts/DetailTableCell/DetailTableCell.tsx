import { Box, Button, TableCell, TextField } from "@mui/material";
import type { MetricRowDefinition } from "@repo/api/types";
import { useEffect, useState } from "react";
import { useUpdateMetric } from "~/features/report/hooks/useUpdateMetric";

type DetailTableCellProps = {
	rowDefinition: MetricRowDefinition;
	index: number;
	metricId?: string;
	projectId?: string;
};

export const DetailTableCell = ({
	rowDefinition,
	index,
	metricId,
	projectId,
}: DetailTableCellProps) => {
	const [text, setText] = useState<string>("");
	useEffect(() => {
		setText(rowDefinition.value[index] ?? "");
	}, [rowDefinition.value, index]);

	const { mutate, isPending } = useUpdateMetric({
		projectId,
	});

	let component;
	switch (rowDefinition.type) {
		case "text":
			component = rowDefinition.value[index];
			break;
		case "input":
			component = (
				<Box sx={{ width: "100%", position: "relative" }}>
					<TextField
						sx={{ marginRight: 2 }}
						label={rowDefinition.label}
						multiline
						fullWidth
						minRows={2}
						maxRows={4}
						value={text}
						onChange={(e) => {
							setText(e.target.value);
						}}
						disabled={isPending}
					/>
					<Button
						variant="contained"
						size="small"
						loading={isPending}
						disabled={text === rowDefinition.value[index]}
						onClick={() => {
							if (!metricId) {
								throw new Error("Metric ID is required");
							}

							mutate({
								id: metricId,
								additionalData: {
									[rowDefinition.dataKey]: text,
								},
							});
						}}
						sx={{
							position: "absolute",
							right: "8px",
							bottom: "8px",
						}}
					>
						Save
					</Button>
				</Box>
			);
			break;
	}
	return <TableCell>{component}</TableCell>;
};

DetailTableCell.displayName = "DetailTableCell";
