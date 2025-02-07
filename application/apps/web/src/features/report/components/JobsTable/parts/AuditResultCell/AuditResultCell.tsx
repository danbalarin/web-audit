import { Typography } from "@mui/material";

type AuditResultCellProps = {
	value: number;
	status: "success" | "warning" | "error";
};

export const AuditResultCell = ({ status, value }: AuditResultCellProps) => {
	return <Typography color={status}>{Math.round(value)}%</Typography>;
};

AuditResultCell.displayName = "AuditResultCell";
