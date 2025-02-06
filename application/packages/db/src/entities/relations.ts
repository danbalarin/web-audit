import { relations } from "drizzle-orm";
import { audits } from "../schema";
import { jobs } from "./job/schema";
import { metrics } from "./metric/schema";
import { projects } from "./project/schema";

export const projectsRelations = relations(projects, ({ many }) => ({
	jobs: many(jobs),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
	project: one(projects, {
		fields: [jobs.projectId],
		references: [projects.id],
	}),
	audits: many(audits),
}));

export const auditsRelations = relations(audits, ({ one, many }) => ({
	job: one(jobs, {
		fields: [audits.jobId],
		references: [jobs.id],
	}),
	metrics: many(metrics),
}));

export const metricsRelations = relations(metrics, ({ one }) => ({
	audit: one(audits, {
		fields: [metrics.auditId],
		references: [audits.id],
	}),
}));
