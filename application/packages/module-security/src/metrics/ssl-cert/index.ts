import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import { compareBoolean, rankBoolean, scoreBoolean } from "@repo/api/utils";

export const SSLCert: MetricDescription = {
	id: "ssl-cert",
	name: "SSL Certificate",
	description:
		"Verifies the presence and validity of SSL/TLS certificates to ensure secure encrypted connections for data transmission between users and the website.",
	unit: Arbitrary.BOOLEAN,
	compare: compareBoolean,
	rank: rankBoolean,
	score: scoreBoolean,
};
