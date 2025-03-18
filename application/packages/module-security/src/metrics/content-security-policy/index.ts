import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

export const ContentSecurityPolicy: MetricDescription = {
	id: "content-security-policy",
	name: "Content Security Policy",
	description: "",
	unit: Arbitrary.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
};
