import { redirect } from "next/navigation";
import { categoriesMap } from "~/features/report/config/metrics";
import { KNOWLEDGE_BASE_ROUTES } from "../../config/routes";

export const KnowledgeBasePage = () => {
	redirect(
		KNOWLEDGE_BASE_ROUTES.CATEGORY(
			Object.keys(categoriesMap)[0] ?? "not-found",
		),
	);
	return null;
};

KnowledgeBasePage.displayName = "KnowledgeBasePage";
