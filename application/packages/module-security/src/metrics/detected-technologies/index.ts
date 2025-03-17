import { Arbitrary } from "@repo/api/metrics";
import { type MetricDescription } from "@repo/api/types";
import {
	compareInformational,
	rankInformational,
	scoreInformational,
} from "@repo/api/utils";

export const DetectedTechnologies: MetricDescription = {
	id: "detected-technologies",
	name: "Detected Technologies",
	description: "",
	unit: Arbitrary.NUMBER,
	compare: compareInformational,
	rank: rankInformational,
	score: scoreInformational,
};
