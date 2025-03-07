import { ContentSecurityPolicies } from "./content-security-policies";
import ContentSecurityPoliciesDocument from "./content-security-policies/description.mdx";
import SecurityDocument from "./description.mdx";

export { SecurityDocument };

export const SecurityCategoryDocuments = {
	[ContentSecurityPolicies.id]: ContentSecurityPoliciesDocument,
};
