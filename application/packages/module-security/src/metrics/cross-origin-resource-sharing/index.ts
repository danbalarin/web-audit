import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

export const CrossOriginResourceSharing: MetricDescription = {
	id: "cross-origin-resource-sharing",
	name: "Cross Origin Resource Sharing",
	description: "",
	unit: Arbitrary.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
};
