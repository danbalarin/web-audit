import { TableCell, TextField } from "@mui/material";
import type { MetricRowDefinition } from "@repo/api/types";

type DetailTableCellProps = {
	type: MetricRowDefinition["type"];
	label: MetricRowDefinition["label"];
	value: MetricRowDefinition["value"][number];
};

export const DetailTableCell = ({
	type,
	label,
	value,
}: DetailTableCellProps) => {
	let component;
	switch (type) {
		case "text":
			component = value;
			break;
		case "input":
			component = (
				<TextField
					sx={{ width: "100%", marginRight: 2 }}
					label={label}
					multiline
					minRows={2}
					maxRows={4}
					value={value}
				/>
			);
			break;
	}
	return <TableCell>{component}</TableCell>;
};

DetailTableCell.displayName = "DetailTableCell";
