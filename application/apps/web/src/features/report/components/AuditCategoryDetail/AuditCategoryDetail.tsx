import type { AuditMetricResult, CategoryDescription } from "@repo/api/types";

type AuditCategoryDetailProps = {
	category: CategoryDescription;
	data: AuditMetricResult[];
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
