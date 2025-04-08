import { Arbitrary, createFlagMetric } from "@repo/api/metrics";
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
const weights = {
	[SEOMetaTagsFlags.TITLE]: 1,
	[SEOMetaTagsFlags.DESCRIPTION]: 1,
	[SEOMetaTagsFlags.KEYWORDS]: 1,
	[SEOMetaTagsFlags.AUTHOR]: 0,
	[SEOMetaTagsFlags.LANGUAGE]: 1,
};

const { getValueFromFlags, score, compare, getMissingTags } = createFlagMetric(
	SEOMetaTagsFlags,
	weights,
);

export { getValueFromFlags };

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
	const missingFlags = getMissingTags(+value);
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

const renderTooltip = ({
	value,
	additionalData,
}: Omit<MetricResult, "id">): string => {
	const missingFlags = getMissingTags(+value);
	console.log(missingFlags, additionalData);

	if (missingFlags.length === 0) {
		return "All required tags are present";
	}

	return `Missing tags ${missingFlags.map((f) => flagTranslations[f as unknown as keyof typeof flagTranslations]).join(", ")}`;
};

const getDetailRows = (res: (Omit<MetricResult, "id"> | null)[]) => {
	return [
		{
			type: "text" as const,
			label: "Missing tags",
			value: res.map((v) =>
				v
					? getMissingTags(+v.value)
							.map(
								(f) =>
									flagTranslations[
										f as unknown as keyof typeof flagTranslations
									],
							)
							.join(", ")
					: "",
			),
		},
	];
};

export const SEOMetaTags: MetricDescription = {
	id: "seoMetaTags",
	name: "SEO Meta Tags",
	description:
		"Evaluates the presence of essential HTML meta tags that help search engines understand, index, and display a website in search results.",
	unit: Arbitrary.NUMBER,
	compare,
	rank,
	score,
	getDetailRows,
	renderValue,
	renderTooltip,
};
