import {
	AuditService,
	JobService,
	MetricService,
	ProjectService,
	createDb,
} from "@repo/db";
import { env } from "~/env.mjs";
import { middleware } from "../trpc/init";

export const dbMiddleware = middleware(async ({ next, ctx }) => {
	try {
		const connectionString = `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
		const db = createDb(connectionString);
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
