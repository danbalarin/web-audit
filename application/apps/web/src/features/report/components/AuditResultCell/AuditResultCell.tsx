import { Typography } from "@mui/material";

type AuditResultCellProps = {
	getValue: () => { score: number; rank: "good" | "average" | "fail" };
};

const statusMap = {
	good: "success",
	average: "warning",
	fail: "error",
} as const;

export const AuditResultCell = ({ getValue }: AuditResultCellProps) => {
	const { score, rank } = getValue();
	return <Typography color={statusMap[rank]}>{Math.round(score)}%</Typography>;
};

AuditResultCell.displayName = "AuditResultCell";
