import { ListItemButton, ListItemText } from "@mui/material";
import { type MetricDescription } from "@repo/api/types";
import { KNOWLEDGE_BASE_ROUTES } from "../../config/routes";

type MetricListItemProps = {
	categoryId: string;
	metric: MetricDescription;
	selected?: boolean;
};

export const MetricListItem = ({
	categoryId,
	metric,
	selected,
}: MetricListItemProps) => {
	return (
		<ListItemButton
			component="a"
			href={KNOWLEDGE_BASE_ROUTES.METRIC(categoryId, metric.id)}
			selected={selected}
			sx={{ pl: 6 }}
		>
			<ListItemText primary={metric.name} />
		</ListItemButton>
	);
};

MetricListItem.displayName = "MetricListItem";
