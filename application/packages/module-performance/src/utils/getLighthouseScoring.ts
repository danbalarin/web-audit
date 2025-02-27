import { MetricDescription } from "@repo/api/types";
import { erf } from "./erf";

const getLogNormal = (median: number, p10: number) => {
	const mu = Math.log(median);
	const sigma = Math.abs(Math.log(p10) - mu) / 1.28155;
	return (x: number) =>
		0.5 * (1 - erf((Math.log(x) - mu) / (sigma * Math.sqrt(2))));
};

export const getLighthouseScoring = (
	median: number,
	p10: number,
): Pick<MetricDescription<number>, "rank" | "score"> => {
	const logNormal = getLogNormal(median, p10);

	const score = (value: number) => {
		if (value < 0) {
			return 0;
		}
		return logNormal(value) * 100;
	};

	const rank = (value: number) => {
		if (score(value) >= 90) {
			return "good";
		}

		if (score(value) >= 50) {
			return "average";
		}

		return "fail";
	};

	return {
		rank,
		score,
	};
};
