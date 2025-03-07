import { MetricDescription } from "@repo/api/types";

export const axeScoring = {
	score: (value: number) => {
		return value * 100;
	},

	rank: (value: number) => {
		if (value >= 0.9) {
			return "good";
		}
		if (value >= 0.5) {
			return "average";
		}
		return "fail";
	},
} as Pick<MetricDescription<number>, "rank" | "score">;
