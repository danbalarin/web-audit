"use client";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { usePathname } from "next/navigation";

import { Suspense, lazy } from "react";
import { REPORT_ROUTES } from "../../config/routes";
import { ProjectListItemsSkeleton } from "./parts/ProjectListItems";

const ProjectListItems = lazy(() =>
	import("./parts/ProjectListItems").then((mod) => ({
		default: mod.ProjectListItems,
	})),
);

export const ProjectList = () => {
	const pathname = usePathname();

	return (
		<List dense disablePadding>
			<ListItemButton
				component="a"
				href={REPORT_ROUTES.NEW_PROJECT}
				selected={pathname.includes(REPORT_ROUTES.NEW_PROJECT)}
			>
				<ListItemText primary={"Create New"} sx={{ textAlign: "center" }} />
			</ListItemButton>
			<Suspense fallback={<ProjectListItemsSkeleton />}>
				<ProjectListItems />
			</Suspense>
		</List>
	);
};

ProjectList.displayName = "ProjectList";
