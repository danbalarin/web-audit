import { MetricRank } from "~/types";

export const rankBoolean = (
	val: number | string,
): Extract<MetricRank, "good" | "fail"> => (+val === 1 ? "good" : "fail");

export const rankInformational = (_val: number | string) =>
	"informational" as const;
