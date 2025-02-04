import { Box } from "@mui/material";
import React from "react";

type PaddedLayoutProps = {
	children: React.ReactNode;
};

export const PaddedLayout = ({ children }: PaddedLayoutProps) => {
	return <Box p={3}>{children}</Box>;
};

PaddedLayout.displayName = "PaddedLayout";
