import type { MetricRank, Ranges } from "../types";
import { DEFAULT_HIGHER_IS_BETTER_RANGES } from "./constants";

export const createRankHigherIsBetter =
	(ranges?: Partial<Ranges>) =>
	(val: number | string): MetricRank => {
		const parsedVal = Number(val);
		const rangesToUse = { ...DEFAULT_HIGHER_IS_BETTER_RANGES, ...ranges };
		if (parsedVal >= rangesToUse.good) {
			return "good";
		} else if (parsedVal >= rangesToUse.average) {
			return "average";
		} else if (parsedVal >= rangesToUse.fail) {
			return "fail";
		}
		return "informational";
	};

export const rankBoolean = (
	val: number | string,
): Extract<MetricRank, "good" | "fail"> => (+val === 1 ? "good" : "fail");

export const rankInformational = (_val: number | string) =>
	"informational" as const;
