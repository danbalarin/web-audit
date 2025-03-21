import type { MetricRank } from "./MetricRank";

export type CalculatedScore<T> = T & {
	score: string | number;
	rank: MetricRank;
};
