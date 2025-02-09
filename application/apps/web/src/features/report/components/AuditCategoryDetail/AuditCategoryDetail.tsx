import type { AuditCategoryResult } from "@repo/api/types";
import { categories } from "~/features/knowledge-base/config/categories";

type AuditCategoryDetailProps = {
	data: AuditCategoryResult[];
};

export const AuditCategoryDetail = ({ data }: AuditCategoryDetailProps) => {
	if (!data[0]?.id) {
		return null;
	}
	const category = categories.find((c) => c.id === data[0]?.id);
	return <div>{category?.name}</div>;
};

AuditCategoryDetail.displayName = "AuditCategoryDetail";
