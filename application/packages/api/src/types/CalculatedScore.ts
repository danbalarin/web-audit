import type { MetricRank } from "./MetricRank";
import type { ScoreResult } from "./ScoreResult";

export type CalculatedScore<T> = T & {
	score: ScoreResult;
	rank: MetricRank;
};
