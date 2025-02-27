import {
	PerformanceCategory,
	PerformanceCategoryDocuments,
	PerformanceDocument,
} from "@repo/module-performance/metrics";

export const categoryDocuments = {
	[PerformanceCategory.id]: {
		document: PerformanceDocument,
		metrics: PerformanceCategoryDocuments,
	},
};
