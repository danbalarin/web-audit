import SecurityDocument from "./description.mdx";
import { VulnerableDependencies } from "./vulnerable-dependencies";
import VulnerableDependenciesDocument from "./vulnerable-dependencies/description.mdx";

export { SecurityDocument };

export const SecurityCategoryDocuments = {
	[VulnerableDependencies.id]: VulnerableDependenciesDocument,
};
