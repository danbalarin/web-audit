import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import SpeedIcon from "@mui/icons-material/Speed";
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
};

export const CategoryListItem = ({
	category,
	selected,
}: CategoryListItemProps) => {
	const icon = ICONS[category.id as CategoryKeys];

	return (
		<ListItemButton
			component="a"
			href={KNOWLEDGE_BASE_ROUTES.CATEGORY(category.id)}
			selected={selected}
		>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={category.name} />
		</ListItemButton>
	);
};

CategoryListItem.displayName = "CategoryListItem";
