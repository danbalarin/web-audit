import { Link, Tooltip } from "@mui/material";
import { CategoryKeys, categoriesMap } from "~/features/report/config/metrics";
import { KNOWLEDGE_BASE_ROUTES } from "../../config/routes";

type KnowledgeLinkProps = {
	categoryId: CategoryKeys;
	metricId?: string;
	children?: React.ReactNode;
};

export const KnowledgeLink = ({
	categoryId,
	metricId,
	children,
}: KnowledgeLinkProps) => {
	const category = categoriesMap[categoryId];
	const metric = category?.metrics.find((m) => m.id === metricId);

	const tooltip = metric?.description || category?.description;
	const href = metric
		? KNOWLEDGE_BASE_ROUTES.METRIC(categoryId, metric.id)
		: KNOWLEDGE_BASE_ROUTES.CATEGORY(categoryId);
	const text = metric ? metric.name : category?.name;

	return (
		<Tooltip title={tooltip} arrow>
			<Link
				href={href}
				component="a"
				sx={{ textDecorationStyle: "dotted", cursor: "help" }}
			>
				{children ?? text}
			</Link>
		</Tooltip>
	);
};

KnowledgeLink.displayName = "KnowledgeLink";
