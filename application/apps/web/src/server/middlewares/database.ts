import {
	AuditService,
	JobService,
	MetricService,
	ProjectService,
	db,
} from "@repo/db";
import { middleware } from "../trpc/init";

export const dbMiddleware = middleware(async ({ next, ctx }) => {
	try {
		return next({
			ctx: {
				...ctx,
				db,
				projectService: new ProjectService(db),
				metricService: new MetricService(db),
				auditService: new AuditService(db),
				jobService: new JobService(db),
			},
		});
	} catch (error) {
		throw new Error(`Error creating db middleware`, { cause: error });
	}
});
