import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

export const ContentSecurityPolicy: MetricDescription = {
	id: "content-security-policy",
	name: "Content Security Policy",
	description:
		"Checks if the website implements Content Security Policy headers to prevent cross-site scripting and other code injection attacks.",
	unit: Arbitrary.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
};
