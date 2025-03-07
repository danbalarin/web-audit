import { MetricDescription } from "@repo/api/types";

export const zapScoring = {
	score: (_value: number) => {
		return -1;
	},

	rank: (value: number) => {
		if (value === 0) {
			return "good";
		}
		if (value <= 2) {
			return "average";
		}
		return "fail";
	},
} as Pick<MetricDescription<number>, "rank" | "score">;
