import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

export const CrossOriginResourceSharing: MetricDescription = {
	id: "cross-origin-resource-sharing",
	name: "Cross Origin Resource Sharing",
	description:
		"Assesses proper implementation of CORS headers that control cross-domain resource access while maintaining security boundaries.",
	unit: Arbitrary.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
};
