import SecurityDocument from "./description.mdx";
import { SSLCert } from "./ssl-cert";
import SSLCertDocument from "./ssl-cert/description.mdx";
import { VulnerableDependencies } from "./vulnerable-dependencies";
import VulnerableDependenciesDocument from "./vulnerable-dependencies/description.mdx";

export { SecurityDocument };

export const SecurityCategoryDocuments = {
	[VulnerableDependencies.id]: VulnerableDependenciesDocument,
	[SSLCert.id]: SSLCertDocument,
};
