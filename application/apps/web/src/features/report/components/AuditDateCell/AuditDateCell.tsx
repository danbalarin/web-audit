import { Tooltip, Typography } from "@mui/material";

type AuditDateCellProps = {
	value: Date;
};

export const AuditDateCell = ({ value }: AuditDateCellProps) => {
	return (
		<Tooltip title={value.toLocaleString()}>
			<Typography>{value.toLocaleDateString()}</Typography>
		</Tooltip>
	);
};

AuditDateCell.displayName = "AuditDateCell";
