import UsabilityDocument from "./description.mdx";
import { NotFoundPage } from "./not-found-page";
import ErrorPageDocument from "./not-found-page/description.mdx";

export { UsabilityDocument };

export const UsabilityCategoryDocuments = {
	[NotFoundPage.id]: ErrorPageDocument,
};
