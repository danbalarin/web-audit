import { Input } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

export const ImmediateFeedback: MetricDescription = {
	id: "immediateFeedback",
	name: "Immediate feedback",
	description: "Does the web provide immediate feedback for user actions?",
	unit: Input.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
	getDetailRows(result) {
		return [
			{
				type: "input",
				label: "Additional notes",
				value: result.map(
					(r) => (r?.additionalData as { notes?: string })?.notes ?? "",
				),
			},
		];
	},
};
