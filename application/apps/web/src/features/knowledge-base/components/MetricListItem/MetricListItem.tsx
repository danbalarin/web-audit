import { ListItemButton, ListItemText } from "@mui/material";
import { type AuditMetricDescription } from "@repo/api/types";
import { KNOWLEDGE_BASE_ROUTES } from "../../config/routes";

type MetricListItemProps = {
	categoryId: string;
	metric: AuditMetricDescription;
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
			sx={{ pl: 4 }}
		>
			<ListItemText primary={metric.name} />
		</ListItemButton>
	);
};

MetricListItem.displayName = "MetricListItem";
