import type { CategoryDescription, MetricResult } from "@repo/api/types";

type AuditCategoryDetailProps = {
	category: CategoryDescription;
	data: MetricResult[];
};

export const AuditCategoryDetail = ({
	category,
	data,
}: AuditCategoryDetailProps) => {
	return (
		<div>
			{category.name}: {data.length}
		</div>
	);
};

AuditCategoryDetail.displayName = "AuditCategoryDetail";
