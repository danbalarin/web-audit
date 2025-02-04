import { redirect } from "next/navigation";
import { categories } from "../../config/categories";
import { KNOWLEDGE_BASE_ROUTES } from "../../config/routes";

export const KnowledgeBasePage = () => {
	redirect(KNOWLEDGE_BASE_ROUTES.CATEGORY(categories[0]?.id ?? ""));
	return null;
};

KnowledgeBasePage.displayName = "KnowledgeBasePage";
