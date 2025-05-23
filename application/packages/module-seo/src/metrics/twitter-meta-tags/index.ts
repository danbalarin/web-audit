import { Arbitrary, createFlagMetric } from "@repo/api/metrics";
import type {
	MetricDescription,
	MetricRank,
	MetricResult,
} from "@repo/api/types";

export enum TwitterMetaTagsFlags {
	CARD = 0x01,
	CARD_FALLBACK = 0x02,
	SITE = 0x04,
	CREATOR = 0x08,
	DESCRIPTION = 0x10,
	DESCRIPTION_FALLBACK = 0x20,
	IMAGE = 0x40,
	IMAGE_FALLBACK = 0x80,
	TITLE = 0x100,
	TITLE_FALLBACK = 0x200,
}

const weights = {
	[TwitterMetaTagsFlags.CARD]: 1,
	[TwitterMetaTagsFlags.SITE]: 1,
	[TwitterMetaTagsFlags.CREATOR]: 1,
	[TwitterMetaTagsFlags.DESCRIPTION]: 1,
	[TwitterMetaTagsFlags.IMAGE]: 1,
	[TwitterMetaTagsFlags.TITLE]: 1,
} as const;

const fallbacks = {
	[TwitterMetaTagsFlags.CARD]: TwitterMetaTagsFlags.CARD_FALLBACK,
	[TwitterMetaTagsFlags.DESCRIPTION]: TwitterMetaTagsFlags.DESCRIPTION_FALLBACK,
	[TwitterMetaTagsFlags.IMAGE]: TwitterMetaTagsFlags.IMAGE_FALLBACK,
	[TwitterMetaTagsFlags.TITLE]: TwitterMetaTagsFlags.TITLE_FALLBACK,
} as const;

const fallbackPenalty = 0.9;

const { score, compare, getFlagsFromValue, getValueFromFlags } =
	createFlagMetric(TwitterMetaTagsFlags, weights, fallbacks, fallbackPenalty);

export { getValueFromFlags };

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
	const missingFlags = Object.values(TwitterMetaTagsFlags).filter(
		(flag) => typeof flag !== "string" && !(castedValue & flag),
	);
	if (missingFlags.length === 0) {
		return "Ok";
	} else {
		return `Missing ${missingFlags.length} tags`;
	}
};

const flagTranslations = {
	[TwitterMetaTagsFlags.CARD]: "Card",
	[TwitterMetaTagsFlags.CARD_FALLBACK]: "Card fallback",
	[TwitterMetaTagsFlags.SITE]: "Site",
	[TwitterMetaTagsFlags.CREATOR]: "Creator",
	[TwitterMetaTagsFlags.DESCRIPTION]: "Description",
	[TwitterMetaTagsFlags.DESCRIPTION_FALLBACK]: "Description fallback",
	[TwitterMetaTagsFlags.IMAGE]: "Image",
	[TwitterMetaTagsFlags.IMAGE_FALLBACK]: "Image fallback",
	[TwitterMetaTagsFlags.TITLE]: "Title",
	[TwitterMetaTagsFlags.TITLE_FALLBACK]: "Title fallback",
};

const renderTooltip = ({ value }: Omit<MetricResult, "id">): string => {
	const flags = getFlagsFromValue(+value);
	const missingFlags = Object.values(TwitterMetaTagsFlags).filter(
		(flag) => typeof flag !== "string" && !flags.includes(flag),
	) as TwitterMetaTagsFlags[];

	if (missingFlags.length === 0) {
		return "All required Twitter meta tags are present";
	}

	return `Missing tags ${missingFlags.map((f) => flagTranslations[f]).join(", ")}`;
};

export const TwitterMetaTags: MetricDescription = {
	id: "twitterMetaTags",
	name: "Twitter Meta Tags",
	description:
		"Assesses the implementation of Twitter Card tags that enable rich media experiences when content is shared on Twitter.",
	unit: Arbitrary.NUMBER,
	compare,
	rank,
	score,
	renderValue,
	renderTooltip,
};
