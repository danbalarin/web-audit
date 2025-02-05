import { relations } from "drizzle-orm";
import { audits } from "../schema";
import { metrics } from "./metric/schema";
import { projects } from "./project/schema";

export const projectsRelations = relations(projects, ({ many }) => ({
	audits: many(audits),
}));

export const auditsRelations = relations(audits, ({ one, many }) => ({
	project: one(projects, {
		fields: [audits.projectId],
		references: [projects.id],
	}),
	metrics: many(metrics),
}));

export const metricsRelations = relations(metrics, ({ one }) => ({
	audit: one(audits, {
		fields: [metrics.auditId],
		references: [audits.id],
	}),
}));
