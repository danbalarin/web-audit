import { Tooltip, Typography } from "@mui/material";
import { formatDate, formatDateTime } from "~/features/ui/utils/date";

type AuditDateCellProps = {
	value: Date;
};

export const AuditDateCell = ({ value }: AuditDateCellProps) => {
	return (
		<Tooltip title={formatDateTime(value)} suppressHydrationWarning>
			<Typography>{formatDate(value)}</Typography>
		</Tooltip>
	);
};

AuditDateCell.displayName = "AuditDateCell";
