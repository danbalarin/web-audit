import { Arbitrary } from "@repo/api/metrics";
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

export const getFlagsFromValue = (value: number): OpenGraphMetaTagsFlags[] => {
	const flags: OpenGraphMetaTagsFlags[] = [];

	Object.values(OpenGraphMetaTagsFlags).forEach((flag) => {
		if (typeof flag !== "string" && value & flag) {
			flags.push(flag);
		}
	});

	return flags;
};

export const getValueFromFlags = (flags: OpenGraphMetaTagsFlags[]): number => {
	let value = 0;

	for (const flag of flags) {
		value |= flag;
	}

	return value;
};

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
	description: "",
	unit: Arbitrary.NUMBER,
	compare,
	rank,
	score,
	renderValue,
	renderTooltip,
};
