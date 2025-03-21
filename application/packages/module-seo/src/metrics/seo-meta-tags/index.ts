import { Arbitrary } from "@repo/api/metrics";
import type {
	MetricDescription,
	MetricRank,
	MetricResult,
} from "@repo/api/types";

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

const renderValue = ({ value }: Omit<MetricResult, "id">): string => {
	const castedValue = +value;
	const missingFlags = Object.values(SEOMetaTagsFlags).filter(
		(flag) => typeof flag !== "string" && !(castedValue & flag),
	);
	if (missingFlags.length === 0) {
		return "Ok";
	} else {
		return `Missing ${missingFlags.length} tags`;
	}
};

const flagTranslations = {
	[SEOMetaTagsFlags.TITLE]: "Title",
	[SEOMetaTagsFlags.DESCRIPTION]: "Description",
	[SEOMetaTagsFlags.KEYWORDS]: "Keywords",
	[SEOMetaTagsFlags.AUTHOR]: "Author",
	[SEOMetaTagsFlags.LANGUAGE]: "Language",
};

const renderTooltip = ({ value }: Omit<MetricResult, "id">): string => {
	const flags = getFlagsFromValue(+value);
	const missingFlags = Object.values(SEOMetaTagsFlags).filter(
		(flag) => typeof flag !== "string" && !flags.includes(flag),
	) as SEOMetaTagsFlags[];

	if (missingFlags.length === 0) {
		return "All required tags are present";
	}

	return `Missing tags ${missingFlags.map((f) => flagTranslations[f]).join(", ")}`;
};

const getMissingTags = ({
	value,
}: Omit<MetricResult, "id">): SEOMetaTagsFlags[] => {
	const flags = getFlagsFromValue(+value);
	const missingFlags = Object.values(SEOMetaTagsFlags).filter(
		(flag) => typeof flag !== "string" && !flags.includes(flag),
	) as SEOMetaTagsFlags[];

	return missingFlags;
};

export const SEOMetaTags: MetricDescription = {
	id: "seoMetaTags",
	name: "SEO Meta Tags",
	description: "",
	unit: Arbitrary.NUMBER,
	compare,
	rank,
	score,
	getDetailRows: (res) => [
		{
			type: "text",
			label: "Missing tags",
			value: res.map((v) =>
				v
					? getMissingTags(v)
							.map((f) => flagTranslations[f])
							.join(", ")
					: "",
			),
		},
	],
	renderValue,
	renderTooltip,
};
