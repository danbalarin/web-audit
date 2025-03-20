import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription, MetricRank } from "@repo/api/types";

export enum SEOMetaTagsFlags {
	TITLE = 0x01,
	DESCRIPTION = 0x02,
	KEYWORDS = 0x04,
	AUTHOR = 0x08,
	LANGUAGE = 0x10,
}

export const getFlagsFromValue = (value: number): SEOMetaTagsFlags[] => {
	const flags: SEOMetaTagsFlags[] = [];

	Object.values(SEOMetaTagsFlags).forEach((flag) => {
		if (typeof flag !== "string" && value & flag) {
			flags.push(flag);
		}
	});

	return flags;
};

export const getValueFromFlags = (flags: SEOMetaTagsFlags[]): number => {
	let value = 0;

	for (const flag of flags) {
		value |= flag;
	}

	return value;
};

const weights = {
	[SEOMetaTagsFlags.TITLE]: 1,
	[SEOMetaTagsFlags.DESCRIPTION]: 1,
	[SEOMetaTagsFlags.KEYWORDS]: 1,
	[SEOMetaTagsFlags.AUTHOR]: 1,
	[SEOMetaTagsFlags.LANGUAGE]: 1,
};

const weightSum = Object.values(weights).reduce(
	(acc, weight) => acc + weight,
	0,
);

const score = (value: number | string): number => {
	const flags = getFlagsFromValue(+value);
	const total = flags.reduce((acc, flag) => acc + weights[flag], 0);
	return total / weightSum;
};

const compare = (a: number | string, b: number | string): number => {
	const scoreA = score(+a);
	const scoreB = score(+b);

	return scoreA - scoreB;
};

const rank = (value: number | string): MetricRank => {
	const calculated = score(+value);
	if (calculated === 1) {
		return "good";
	}
	if (calculated > 0.5) {
		return "average";
	}
	return "fail";
};

export const SEOMetaTags: MetricDescription = {
	id: "seoMetaTags",
	name: "SEO Meta Tags",
	description: "",
	unit: Arbitrary.NUMBER,
	compare,
	rank,
	score,
};
