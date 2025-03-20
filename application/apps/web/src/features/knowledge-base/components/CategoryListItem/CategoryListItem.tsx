import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SpeedIcon from "@mui/icons-material/Speed";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { CategoryDescription } from "@repo/api/types";
import React from "react";

import type { CategoryKeys } from "~/features/report/config/metrics";
import { KNOWLEDGE_BASE_ROUTES } from "../../config/routes";

type CategoryListItemProps = {
	category: CategoryDescription;
	selected?: boolean;
};

const ICONS: Record<CategoryKeys, React.ReactNode> = {
	performance: <SpeedIcon />,
	accessibility: <AccessibilityNewIcon />,
	security: <LockOpenIcon />,
	seo: <TroubleshootIcon />,
};

export const CategoryListItem = ({
	category,
	selected,
}: CategoryListItemProps) => {
	const icon = ICONS[category.id as CategoryKeys];

	return (
		<ListItemButton
			sx={{ pl: 4 }}
			component="a"
			href={KNOWLEDGE_BASE_ROUTES.CATEGORY(category.id)}
			selected={selected}
		>
			<ListItemIcon sx={{ marginRight: "1em", minWidth: 0 }}>
				{icon}
			</ListItemIcon>
			<ListItemText primary={category.name} />
		</ListItemButton>
	);
};

CategoryListItem.displayName = "CategoryListItem";
