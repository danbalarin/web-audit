import { Arbitrary } from "@repo/api/metrics";
import type { MetricDescription } from "@repo/api/types";
import {
	compareInformational,
	rankInformational,
	scoreInformational,
} from "@repo/api/utils";
import type { Technology } from "~/TechnologyRunner";

const isAdditionalData = (
	additionalData?: unknown,
): additionalData is Technology[] => {
	const casted = additionalData as Technology[];
	return Boolean(
		casted &&
			"length" in casted &&
			casted.length > 0 &&
			"slug" in (casted[0] ?? {}),
	);
};

const getTechnologyName = (technology: Technology) => {
	const res = [];
	if (technology.name) {
		res.push(technology.name);
	}
	if (technology.version) {
		res.push(`(${technology.version})`);
	}
	return res.join(" ");
};

export const DetectedTechnologies: MetricDescription = {
	id: "detected-technologies",
	name: "Detected Technologies",
	description:
		"Identifies frameworks, libraries, and third-party services used by the website to evaluate potential security implications and vulnerabilities.",
	unit: Arbitrary.NUMBER,
	compare: compareInformational,
	rank: rankInformational,
	score: scoreInformational,
	getDetailRows: (data) => {
		return [
			{
				type: "text",
				label: "",
				value: data.map((col) => {
					if (!isAdditionalData(col?.additionalData)) {
						return "-";
					}
					return col.additionalData.map(getTechnologyName).join(", ");
				}),
			},
		];
	},
};
