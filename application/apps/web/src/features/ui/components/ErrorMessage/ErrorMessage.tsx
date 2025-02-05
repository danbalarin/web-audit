import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import { Box, Typography } from "@mui/material";

type ErrorMessageProps = {
	title: string;
	subtitle?: string;
};

export const ErrorMessage = ({ title, subtitle }: ErrorMessageProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				gap: 4,
			}}
		>
			<DangerousOutlinedIcon sx={{ fontSize: "10em" }} />
			<Typography variant="h1">{title}</Typography>
			{subtitle && <Typography variant="h2">{subtitle}</Typography>}
		</Box>
	);
};

ErrorMessage.displayName = "ErrorMessage";
