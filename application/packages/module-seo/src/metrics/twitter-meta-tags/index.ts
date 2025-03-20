import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription, MetricRank } from "@repo/api/types";

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

export const getFlagsFromValue = (value: number): TwitterMetaTagsFlags[] => {
	const flags: TwitterMetaTagsFlags[] = [];

	Object.values(TwitterMetaTagsFlags).forEach((flag) => {
		if (typeof flag !== "string" && value & flag) {
			flags.push(flag);
		}
	});

	return flags;
};

export const getValueFromFlags = (flags: TwitterMetaTagsFlags[]): number => {
	let value = 0;

	for (const flag of flags) {
		value |= flag;
	}

	return value;
};

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

const weightSum = Object.values(weights).reduce(
	(acc, weight) => acc + weight,
	0,
);

const score = (value: number | string): number => {
	const flags = getFlagsFromValue(+value);
	const total = flags.reduce((acc, flag) => {
		const weight = weights[flag as keyof typeof weights] ?? 0;
		const fallback = fallbacks[flag as keyof typeof fallbacks] ?? 0;
		const fallbackFlag = fallback && flags.includes(fallback);

		if (weight) {
			return acc + weight;
		}
		if (weight && fallbackFlag) {
			return acc + weight * fallbackPenalty;
		}
		return acc;
	}, 0);

	return total / weightSum;
};

const compare = (a: number | string, b: number | string): number => {
	const scoreA = score(+a);
	const scoreB = score(+b);

	return scoreA - scoreB;
};

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

export const TwitterMetaTags: MetricDescription = {
	id: "twitterMetaTags",
	name: "Twitter Meta Tags",
	description: "",
	unit: Arbitrary.NUMBER,
	compare,
	rank,
	score,
};
