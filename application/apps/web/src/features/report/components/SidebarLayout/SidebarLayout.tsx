import InfoIcon from "@mui/icons-material/Info";
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

import React from "react";

type SidebarLayoutProps = {
	children: React.ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
	return (
		<>
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
					<ListItemButton>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary={"About"} />
					</ListItemButton>
				</List>
			</Drawer>
			<main>{children}</main>
		</>
	);
};

SidebarLayout.displayName = "SidebarLayout";
