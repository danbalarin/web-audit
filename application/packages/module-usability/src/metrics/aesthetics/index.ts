import { Input } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

const NOTES_KEY = "notes";

export const Aesthetics: MetricDescription = {
	id: "aesthetics",
	name: "Aesthetics",
	description: "Is the visual design aesthetically pleasing?",
	unit: Input.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
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
