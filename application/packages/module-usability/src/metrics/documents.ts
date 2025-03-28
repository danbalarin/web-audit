import UsabilityDocument from "./description.mdx";
import { ImmediateFeedback } from "./immediate-feedback";
import ImmediateFeedbackDocument from "./immediate-feedback/description.mdx";
import { NotFoundPage } from "./not-found-page";
import NotFoundPageDocument from "./not-found-page/description.mdx";

export { UsabilityDocument };

export const UsabilityCategoryDocuments = {
	[NotFoundPage.id]: NotFoundPageDocument,
	[ImmediateFeedback.id]: ImmediateFeedbackDocument,
};
