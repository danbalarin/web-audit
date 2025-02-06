import { audits } from "./entities/audit/schema";
import { jobs } from "./entities/job/schema";
import { metrics } from "./entities/metric/schema";
import { projects } from "./entities/project/schema";
import {
	auditsRelations,
	jobsRelations,
	metricsRelations,
	projectsRelations,
} from "./entities/relations";

export const schema = {
	jobs,
	jobsRelations,
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
	jobs,
	jobsRelations,
	metrics,
	metricsRelations,
	projects,
	projectsRelations,
};
