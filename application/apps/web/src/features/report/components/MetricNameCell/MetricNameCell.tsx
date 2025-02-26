import { KnowledgeLink } from "~/features/knowledge-base/components/KnowledgeLink";
import { getMetricCategory, metricsMap } from "../../config/metrics";

type MetricNameCellProps = {
	id: string;
};

export const MetricNameCell = ({ id }: MetricNameCellProps) => {
	const category = getMetricCategory(id);
	const metricDescription = metricsMap[id];

	if (!category) {
		return id;
	}

	return (
		<KnowledgeLink categoryId={category.id} metricId={id}>
			{metricDescription?.name}
		</KnowledgeLink>
	);
};

MetricNameCell.displayName = "MetricNameCell";
