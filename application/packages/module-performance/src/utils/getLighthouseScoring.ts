import { AuditMetricDescription } from "@repo/api/types";
import { erf } from "mathjs";

const getLogNormal = (median: number, p10: number) => {
	const mu = Math.log(median);
	const sigma = Math.abs(Math.log(p10) - mu) / 1.28155;
	return (x: number) =>
		0.5 * (1 - erf((Math.log(x) - mu) / (sigma * Math.sqrt(2))));
};

export const getLighthouseScoring = (
	median: number,
	p10: number,
): Pick<AuditMetricDescription<number>, "rank" | "score"> => {
	const logNormal = getLogNormal(median, p10);

	return {
		rank: (value) => {
			if (value >= p10) {
				return "good";
			}

			if (value >= median) {
				return "average";
			}

			return "fail";
		},
		score: (value) => logNormal(value) * 100,
	};
};
