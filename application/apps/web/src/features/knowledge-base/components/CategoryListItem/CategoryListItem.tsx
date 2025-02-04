import SpeedIcon from "@mui/icons-material/Speed";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AuditCategoryDescription } from "@repo/api/types";
import React from "react";
import { KNOWLEDGE_BASE_ROUTES } from "../../config/routes";

type CategoryListItemProps = {
	category: AuditCategoryDescription;
	selected?: boolean;
};

const ICONS: Record<string, React.ReactNode> = {
	performance: <SpeedIcon />,
};

export const CategoryListItem = ({
	category,
	selected,
}: CategoryListItemProps) => {
	const icon = ICONS[category.id];

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
