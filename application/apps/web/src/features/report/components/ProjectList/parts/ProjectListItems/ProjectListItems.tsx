"use client";

import { Box, ListItemButton, ListItemText } from "@mui/material";
import { usePathname } from "next/navigation";
import { trpc } from "~/server/query/client";
import { REPORT_ROUTES } from "../../../../config/routes";

export const ProjectListItems = () => {
	const pathname = usePathname();
	const [projects] = trpc.projects.findAll.useSuspenseQuery();

	if (projects.length === 0) {
		return (
			<Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
				No Projects
			</Box>
		);
	}

	return projects.map((p) => (
		<ListItemButton
			key={p.id}
			component="a"
			href={REPORT_ROUTES.PROJECT(p.id)}
			selected={pathname.includes(p.id)}
			sx={{ pl: 4 }}
		>
			<ListItemText primary={p.name} secondary={p.homeUrl} />
		</ListItemButton>
	));
};

ProjectListItems.displayName = "ProjectListItems";
