import AccessibilityDocument from "./description.mdx";
import { SEOMetaTags } from "./seo-meta-tags";
import SEOMetaTagsDocument from "./seo-meta-tags/description.mdx";
import { TwitterMetaTags } from "./twitter-meta-tags";
import TwitterMetaTagsDocument from "./twitter-meta-tags/description.mdx";

export { AccessibilityDocument };

export const AccessibilityCategoryDocuments = {
	[SEOMetaTags.id]: SEOMetaTagsDocument,
	[TwitterMetaTags.id]: TwitterMetaTagsDocument,
};
