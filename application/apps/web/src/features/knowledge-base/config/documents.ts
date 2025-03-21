import {
	AccessibilityCategory,
	AccessibilityCategoryDocuments,
	AccessibilityDocument,
} from "@repo/module-accessibility/metrics";
import {
	PerformanceCategory,
	PerformanceCategoryDocuments,
	PerformanceDocument,
} from "@repo/module-performance/metrics";
import {
	SecurityCategory,
	SecurityCategoryDocuments,
	SecurityDocument,
} from "@repo/module-security/metrics";
import {
	SEOCategory,
	SEOCategoryDocuments,
	SEODocument,
} from "@repo/module-seo/metrics";
import type { MDXContent } from "mdx/types";
import type { CategoryKeys } from "~/features/report/config/metrics";

export const categoryDocuments: Record<
	CategoryKeys,
	{ document: MDXContent; metrics: Record<string, MDXContent> }
> = {
	[PerformanceCategory.id]: {
		document: PerformanceDocument,
		metrics: PerformanceCategoryDocuments,
	},
	[AccessibilityCategory.id]: {
		document: AccessibilityDocument,
		metrics: AccessibilityCategoryDocuments,
	},
	[SecurityCategory.id]: {
		document: SecurityDocument,
		metrics: SecurityCategoryDocuments,
	},
	[SEOCategory.id]: {
		document: SEODocument,
		metrics: SEOCategoryDocuments,
	},
};
