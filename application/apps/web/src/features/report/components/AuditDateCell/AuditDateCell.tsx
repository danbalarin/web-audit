import { Tooltip, Typography } from "@mui/material";
import { formatDateTime } from "~/features/ui/utils/date";

type AuditDateCellProps = {
	value: Date;
};

export const AuditDateCell = ({ value }: AuditDateCellProps) => {
	return (
		<Tooltip title={formatDateTime(value)} suppressHydrationWarning>
			<Typography>{formatDateTime(value)}</Typography>
		</Tooltip>
	);
};

AuditDateCell.displayName = "AuditDateCell";
