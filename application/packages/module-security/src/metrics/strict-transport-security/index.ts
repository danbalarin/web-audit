import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

export const StrictTransportSecurity: MetricDescription = {
	id: "strict-transport-security",
	name: "Strict Transport Security",
	description: "",
	unit: Arbitrary.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
};
