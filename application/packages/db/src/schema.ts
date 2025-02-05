import { audits } from "./entities/audit/schema";
import { metrics } from "./entities/metric/schema";
import { projects } from "./entities/project/schema";
import {
	auditsRelations,
	metricsRelations,
	projectsRelations,
} from "./entities/relations";

export const schema = {
	audits,
	auditsRelations,
	projects,
	projectsRelations,
	metrics,
	metricsRelations,
};

export {
	audits,
	auditsRelations,
	metrics,
	metricsRelations,
	projects,
	projectsRelations,
};
