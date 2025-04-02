import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

export const StrictTransportSecurity: MetricDescription = {
	id: "strict-transport-security",
	name: "Strict Transport Security",
	description:
		"Checks if the site implements HTTP Strict Transport Security (HSTS) headers to enforce secure HTTPS connections and prevent downgrade attacks.",
	unit: Arbitrary.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
};
