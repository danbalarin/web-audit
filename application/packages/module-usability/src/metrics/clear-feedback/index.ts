import { Input } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import {
	createMetricCompareHigherIsBetter,
	createRankHigherIsBetter,
	createScoreNumber,
} from "@repo/api/utils";

const NOTES_KEY = "notes";

export const ClearFeedback: MetricDescription = {
	id: "clearFeedback",
	name: "Clear feedback",
	description: "How clear is the feedback to the user? Scale from 1 to 100.",
	unit: Input.NUMBER,
	compare: createMetricCompareHigherIsBetter(),
	rank: createRankHigherIsBetter(),
	score: createScoreNumber(),
	getDetailRows(result) {
		return [
			{
				type: "input",
				label: "Additional notes",
				dataKey: NOTES_KEY,
				value: result.map(
					(r) =>
						(r?.additionalData as { [NOTES_KEY]?: string })?.[NOTES_KEY] ?? "",
				),
			},
		];
	},
};
