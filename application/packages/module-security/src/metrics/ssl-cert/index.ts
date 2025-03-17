import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

export const SSLCert: MetricDescription = {
	id: "ssl-cert",
	name: "SSL Certificate",
	description: "",
	unit: Arbitrary.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
};
