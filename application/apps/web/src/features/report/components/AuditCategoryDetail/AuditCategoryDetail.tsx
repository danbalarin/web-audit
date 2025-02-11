import type {
	AuditCategoryDescription,
	AuditMetricResult,
} from "@repo/api/types";

type AuditCategoryDetailProps = {
	category: AuditCategoryDescription;
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
