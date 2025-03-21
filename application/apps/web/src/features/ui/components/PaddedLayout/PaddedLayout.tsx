import { Box, type BoxProps } from "@mui/material";

type PaddedLayoutProps = BoxProps;

export const PaddedLayout = ({ children, ...props }: PaddedLayoutProps) => {
	return (
		<Box p={3} {...props}>
			{children}
		</Box>
	);
};

PaddedLayout.displayName = "PaddedLayout";
