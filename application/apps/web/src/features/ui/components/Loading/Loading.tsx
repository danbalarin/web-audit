import { Box, BoxProps, CircularProgress, Typography } from "@mui/material";

type LoadingProps = Omit<BoxProps, "children" | "sx"> & {
	text?: string;
	progress?: number;
};

export const Loading = ({ text, progress, ...props }: LoadingProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				width: "100%",
				gap: 2,
			}}
			{...props}
		>
			{text && <Typography variant="h3">{text}</Typography>}
			<CircularProgress
				variant={progress === undefined ? "indeterminate" : "determinate"}
				value={progress}
			/>
		</Box>
	);
};

Loading.displayName = "Loading";
