import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import { createMetricCompareLowerIsBetter } from "@repo/api/utils";
import { TechnologyRunnerResult } from "~/TechnologyRunner";

const isAdditionalData = (
	additionalData?: unknown,
): additionalData is TechnologyRunnerResult => {
	const casted = additionalData as TechnologyRunnerResult;
	return Boolean(
		casted &&
			"length" in casted &&
			casted.length > 0 &&
			"vulnerabilities" in (casted[0] ?? {}),
	);
};

export const VulnerableDependencies: MetricDescription = {
	id: "vulnerable-dependencies",
	name: "Vulnerable Dependencies",
	description: "",
	unit: Arbitrary.NUMBER,
	compare: createMetricCompareLowerIsBetter(0),
	rank: (val) => (+val > 0 ? "fail" : "good"),
	score: (val) => (+val > 0 ? 0 : 100),
	renderTooltip: ({ additionalData }) => {
		if (!isAdditionalData(additionalData)) {
			return "No vulnerabilities found in dependencies";
		}

		return `Found vulnerabilities in dependencies ${additionalData.map((data) => data.technology.name).join(", ")}`;
	},
};
