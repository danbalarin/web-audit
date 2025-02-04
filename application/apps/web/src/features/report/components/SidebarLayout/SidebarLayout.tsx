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
import { usePathname } from "next/navigation";
import React from "react";

import { KNOWLEDGE_BASE_ROUTES } from "~/features/knowledge-base/config/routes";

type SidebarLayoutProps = {
	children: React.ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
	const activePath = usePathname();

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
					<ListItemButton component="a" href="/project/new">
						<ListItemIcon>
							<NoteAddIcon />
						</ListItemIcon>
						<ListItemText primary={"Create New"} />
					</ListItemButton>
				</List>
				<Divider />
				<ListSubheader>Projects</ListSubheader>
				<List disablePadding>
					<ListItemButton>
						<ListItemText primary={"Project #1"} />
					</ListItemButton>
				</List>
				<Box sx={{ flexGrow: 1 }} />
				<Divider />
				<List disablePadding sx={{ justifySelf: "flex-end" }}>
					<ListItemButton
						component="a"
						href={KNOWLEDGE_BASE_ROUTES.BASE}
						selected={activePath.includes(KNOWLEDGE_BASE_ROUTES.BASE)}
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
