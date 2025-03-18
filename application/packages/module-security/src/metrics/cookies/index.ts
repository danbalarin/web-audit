import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription, MetricRank } from "@repo/api/types";

export enum CookiesFlags {
	PRESENT = 0x01,
	HTTP_ONLY = 0x02,
	SECURE = 0x04,
	SAME_SITE = 0x08,
}

export const getFlagsFromValue = (value: number): CookiesFlags[] => {
	const flags: CookiesFlags[] = [];

	if (value & CookiesFlags.PRESENT) {
		flags.push(CookiesFlags.PRESENT);
	}
	if (value & CookiesFlags.HTTP_ONLY) {
		flags.push(CookiesFlags.HTTP_ONLY);
	}
	if (value & CookiesFlags.SECURE) {
		flags.push(CookiesFlags.SECURE);
	}
	if (value & CookiesFlags.SAME_SITE) {
		flags.push(CookiesFlags.SAME_SITE);
	}

	return flags;
};

export const getValueFromFlags = (flags: CookiesFlags[]): number => {
	let value = 0;

	for (const flag of flags) {
		value |= flag;
	}

	return value;
};

const compare = (a: number, b: number): number => {
	if (a === b || a === 0 || b === 0) {
		return 0;
	}

	const flagsA = getFlagsFromValue(a);
	const flagsB = getFlagsFromValue(b);

	if (flagsA.length !== flagsB.length) {
		const longer = flagsA.length > flagsB.length ? flagsA : flagsB;
		const shorter = flagsA.length < flagsB.length ? flagsA : flagsB;

		for (const flag of shorter) {
			if (!longer.includes(flag)) {
				return 0;
			}
		}
		return longer === flagsA ? 1 : -1;
	}

	return 0;
};

const rank = (value: number): MetricRank => {
	const flags = getFlagsFromValue(value);

	if (!flags.includes(CookiesFlags.PRESENT)) {
		return "informational";
	}

	const allFlags = Object.values(CookiesFlags).filter(
		(flag) => typeof flag === "number",
	) as CookiesFlags[];

	if (flags.length === allFlags.length) {
		return "good";
	}

	if (flags.length === allFlags.length - 1) {
		return "average";
	}

	return "fail";
};

const score = (value: number): number => {
	const flags = getFlagsFromValue(value);

	if (!flags.includes(CookiesFlags.PRESENT)) {
		return 100;
	}

	const allFlags = Object.values(CookiesFlags).filter(
		(flag) => typeof flag === "number",
	) as CookiesFlags[];

	return 100 * (flags.length / allFlags.length);
};

export const Cookies: MetricDescription = {
	id: "cookies",
	name: "Cookies",
	description: "",
	unit: Arbitrary.NUMBER,
	compare,
	rank,
	score,
};
