"use client";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NoteIcon from "@mui/icons-material/Note";
import {
	Box,
	Collapse,
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { usePathname } from "next/navigation";
import type React from "react";

import { KnowledgeBaseSidebarList } from "~/features/knowledge-base/components/KnowledgeBaseSidebarList";
import { KNOWLEDGE_BASE_ROUTES } from "~/features/knowledge-base/config/routes";
import { REPORT_ROUTES } from "../../config/routes";
import { ProjectList } from "../ProjectList";

type SidebarLayoutProps = {
	children: React.ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
	const pathname = usePathname();

	const selectedProject = pathname.includes(REPORT_ROUTES.BASE);
	const selectedKnowledgeBase = pathname.includes(KNOWLEDGE_BASE_ROUTES.BASE);

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
					<ListItemButton href={REPORT_ROUTES.BASE} selected={selectedProject}>
						<ListItemIcon>
							<NoteIcon />
						</ListItemIcon>
						<ListItemText primary="Projects" />
						{selectedProject ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</ListItemButton>
					<Collapse in={selectedProject} timeout="auto" unmountOnExit>
						<ProjectList />
					</Collapse>
				</List>
				<Divider />
				<List disablePadding>
					<ListItemButton
						href={KNOWLEDGE_BASE_ROUTES.BASE}
						selected={selectedKnowledgeBase}
					>
						<ListItemIcon>
							<MenuBookIcon />
						</ListItemIcon>
						<ListItemText primary="Knowledge Base" />
						{selectedKnowledgeBase ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</ListItemButton>
					<Collapse in={selectedKnowledgeBase} timeout="auto" unmountOnExit>
						<KnowledgeBaseSidebarList />
					</Collapse>
				</List>
				<Box sx={{ flexGrow: 1 }} />
				<Divider />
				<List disablePadding sx={{ justifySelf: "flex-end" }}>
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
