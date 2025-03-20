import AccessibilityDocument from "./description.mdx";
import { OpenGraphMetaTags } from "./open-graph-meta-tags";
import OpenGraphMetaTagsDocument from "./open-graph-meta-tags/description.mdx";
import { SEOMetaTags } from "./seo-meta-tags";
import SEOMetaTagsDocument from "./seo-meta-tags/description.mdx";
import { TwitterMetaTags } from "./twitter-meta-tags";
import TwitterMetaTagsDocument from "./twitter-meta-tags/description.mdx";

export { AccessibilityDocument };

export const AccessibilityCategoryDocuments = {
	[SEOMetaTags.id]: SEOMetaTagsDocument,
	[TwitterMetaTags.id]: TwitterMetaTagsDocument,
	[OpenGraphMetaTags.id]: OpenGraphMetaTagsDocument,
};
