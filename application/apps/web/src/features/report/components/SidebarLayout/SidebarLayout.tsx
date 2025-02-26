"use client";
import InfoIcon from "@mui/icons-material/Info";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";

import { KNOWLEDGE_BASE_ROUTES } from "~/features/knowledge-base/config/routes";
import { REPORT_ROUTES } from "../../config/routes";
import { ProjectListSkeleton } from "../ProjectList/ProjectList.Skeleton";

const ProjectList = dynamic(
	() => import("../ProjectList").then((mod) => mod.ProjectList),
	{ ssr: false },
);

type SidebarLayoutProps = {
	children: React.ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
	const pathname = usePathname();

	return (
		<Box sx={{ display: "flex" }}>
			<Drawer
				variant="permanent"
				anchor="left"
				sx={{
					width: 240,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: 240,
						boxSizing: "border-box",
						display: "flex",
						height: "100%",
					},
				}}
				PaperProps={{
					component: "nav",
				}}
			>
				<List disablePadding>
					<ListItemButton
						component="a"
						href={REPORT_ROUTES.NEW_PROJECT}
						selected={pathname.includes(REPORT_ROUTES.NEW_PROJECT)}
					>
						<ListItemIcon>
							<NoteAddIcon />
						</ListItemIcon>
						<ListItemText primary={"Create New"} />
					</ListItemButton>
				</List>
				<Divider />
				<ListSubheader>Projects</ListSubheader>
				<List disablePadding>
					<Suspense fallback={<ProjectListSkeleton />}>
						<ProjectList />
					</Suspense>
				</List>
				<Box sx={{ flexGrow: 1 }} />
				<Divider />
				<List disablePadding sx={{ justifySelf: "flex-end" }}>
					<ListItemButton
						component="a"
						href={KNOWLEDGE_BASE_ROUTES.BASE}
						selected={pathname.includes(KNOWLEDGE_BASE_ROUTES.BASE)}
					>
						<ListItemIcon>
							<MenuBookIcon />
						</ListItemIcon>
						<ListItemText primary={"Knowledge Base"} />
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary={"About"} />
					</ListItemButton>
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, minHeight: "100%" }}>
				{children}
			</Box>
		</Box>
	);
};

SidebarLayout.displayName = "SidebarLayout";
