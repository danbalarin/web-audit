"use client";

import { Box, ListItemButton, ListItemText } from "@mui/material";
import { trpc } from "~/server/query/client";
import { REPORT_ROUTES } from "../../config/routes";

export const ProjectList = () => {
	const [projects] = trpc.projects.findAll.useSuspenseQuery();

	if (projects.length === 0) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>No Projects</Box>
		);
	}

	return projects.map((p) => (
		<ListItemButton key={p.id} component="a" href={REPORT_ROUTES.PROJECT(p.id)}>
			<ListItemText primary={p.name} secondary={p.homeUrl} />
		</ListItemButton>
	));
};

ProjectList.displayName = "ProjectList";
