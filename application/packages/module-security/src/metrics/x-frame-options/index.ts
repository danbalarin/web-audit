import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription, MetricRank } from "@repo/api/types";

export enum XFrameOptionsValue {
	DENY,
	SAMEORIGIN,
	ALLOW_FROM,
	NOT_SET,
}

const compare = (a: string | number, b: string | number): number => {
	const castedA = a as XFrameOptionsValue;
	const castedB = b as XFrameOptionsValue;

	const RANK = {
		[XFrameOptionsValue.DENY]: 2,
		[XFrameOptionsValue.SAMEORIGIN]: 2,
		[XFrameOptionsValue.ALLOW_FROM]: 1,
		[XFrameOptionsValue.NOT_SET]: 0,
	};

	return Math.min(Math.max(RANK[castedA] - RANK[castedB], -1), 1);
};

const rank = (value: string | number): MetricRank => {
	const castedValue = value as XFrameOptionsValue;

	const RANK = {
		[XFrameOptionsValue.DENY]: "good",
		[XFrameOptionsValue.SAMEORIGIN]: "good",
		[XFrameOptionsValue.ALLOW_FROM]: "average",
		[XFrameOptionsValue.NOT_SET]: "fail",
	} as const;

	return RANK[castedValue];
};

const score = (value: string | number): number => {
	const castedValue = value as XFrameOptionsValue;

	const SCORE = {
		[XFrameOptionsValue.DENY]: 100,
		[XFrameOptionsValue.SAMEORIGIN]: 100,
		[XFrameOptionsValue.ALLOW_FROM]: 50,
		[XFrameOptionsValue.NOT_SET]: 0,
	};

	return SCORE[castedValue];
};

const renderTranslation: Record<XFrameOptionsValue, string> = {
	[XFrameOptionsValue.DENY]: "Deny",
	[XFrameOptionsValue.SAMEORIGIN]: "Same origin",
	[XFrameOptionsValue.ALLOW_FROM]: "Allow from",
	[XFrameOptionsValue.NOT_SET]: "Not set",
};

const renderValue: MetricDescription["renderValue"] = ({ value }) =>
	renderTranslation[value as XFrameOptionsValue] ?? "Unknown";

export const XFrameOptions: MetricDescription = {
	id: "x-frame-options",
	name: "X-Frame Options",
	description:
		"Checks if the website implements X-Frame-Options headers to prevent clickjacking attacks by controlling iframe embedding permissions.",
	unit: Arbitrary.NUMBER,
	compare,
	rank,
	score,
	renderValue,
};
