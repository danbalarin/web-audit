import { Arbitrary, createFlagMetric } from "@repo/api/metrics";
import type {
	MetricDescription,
	MetricRank,
	MetricResult,
} from "@repo/api/types";

export enum OpenGraphMetaTagsFlags {
	TITLE = 0x01,
	TITLE_FALLBACK = 0x02,
	DESCRIPTION = 0x04,
	IMAGE = 0x08,
	URL = 0x10,
	TYPE = 0x20,
	SITE_NAME = 0x40,
	LOCALE = 0x80,
	LOCALE_FALLBACK = 0x100,
}

const weights = {
	[OpenGraphMetaTagsFlags.TITLE]: 1,
	[OpenGraphMetaTagsFlags.DESCRIPTION]: 1,
	[OpenGraphMetaTagsFlags.IMAGE]: 1,
	[OpenGraphMetaTagsFlags.URL]: 0.3,
	[OpenGraphMetaTagsFlags.TYPE]: 0.7,
	[OpenGraphMetaTagsFlags.SITE_NAME]: 0.7,
	[OpenGraphMetaTagsFlags.LOCALE]: 1,
} as const;

const fallbacks = {
	[OpenGraphMetaTagsFlags.TITLE]: OpenGraphMetaTagsFlags.TITLE_FALLBACK,
	[OpenGraphMetaTagsFlags.LOCALE]: OpenGraphMetaTagsFlags.LOCALE_FALLBACK,
} as const;

const fallbackPenalty = 0.9;

const { score, compare, getFlagsFromValue } = createFlagMetric(
	OpenGraphMetaTagsFlags,
	weights,
	fallbacks,
	fallbackPenalty,
);

const rank = (value: number | string): MetricRank => {
	const calculated = score(+value);
	if (calculated >= fallbackPenalty) {
		return "good";
	}
	if (calculated > 0.5) {
		return "average";
	}
	return "fail";
};

const renderValue = ({ value }: Omit<MetricResult, "id">): string => {
	const castedValue = +value;
	const missingFlags = Object.values(OpenGraphMetaTagsFlags).filter(
		(flag) => typeof flag !== "string" && !(castedValue & flag),
	);
	if (missingFlags.length === 0) {
		return "Ok";
	} else {
		return `Missing ${missingFlags.length} tags`;
	}
};

const flagTranslations = {
	[OpenGraphMetaTagsFlags.TITLE]: "Title",
	[OpenGraphMetaTagsFlags.TITLE_FALLBACK]: "Title fallback",
	[OpenGraphMetaTagsFlags.DESCRIPTION]: "Description",
	[OpenGraphMetaTagsFlags.IMAGE]: "Image",
	[OpenGraphMetaTagsFlags.URL]: "URL",
	[OpenGraphMetaTagsFlags.TYPE]: "Type",
	[OpenGraphMetaTagsFlags.SITE_NAME]: "Site name",
	[OpenGraphMetaTagsFlags.LOCALE]: "Locale",
	[OpenGraphMetaTagsFlags.LOCALE_FALLBACK]: "Locale fallback",
} as const;

const renderTooltip = ({ value }: Omit<MetricResult, "id">): string => {
	const flags = getFlagsFromValue(+value);
	const missingFlags = Object.values(OpenGraphMetaTagsFlags).filter(
		(flag) => typeof flag !== "string" && !flags.includes(flag),
	) as OpenGraphMetaTagsFlags[];

	if (missingFlags.length === 0) {
		return "All required Open Graph meta tags are present";
	}

	return `Missing tags ${missingFlags.map((f) => flagTranslations[f]).join(", ")}`;
};

export const OpenGraphMetaTags: MetricDescription = {
	id: "openGraphMetaTags",
	name: "Open Graph Meta Tags",
	description:
		"Measures the implementation of Open Graph protocol tags that control how content appears when shared on Facebook and other social platforms.",
	unit: Arbitrary.NUMBER,
	compare,
	rank,
	score,
	renderValue,
	renderTooltip,
};
