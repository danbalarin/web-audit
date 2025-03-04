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
import type { MDXContent } from "mdx/types";
import { CategoryKeys } from "~/features/report/config/metrics";

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
};
