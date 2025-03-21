import type { InferSelectModel } from "drizzle-orm";
import { json, pgTable, real, uuid } from "drizzle-orm/pg-core";
import { projects } from "../project/schema";
import { id } from "../utils/id";
import { timestamps } from "../utils/timestamps";

export const jobs = pgTable("jobs", {
	...id,
	...timestamps,
	projectId: uuid("project_id")
		.references(() => projects.id, { onDelete: "cascade" })
		.notNull(),
	progress: real("progress").default(0).notNull(),
	error: json("error"),
	moduleStatuses: json("module_statuses").default({}).notNull(),
});

export type Job = Omit<InferSelectModel<typeof jobs>, "deletedAt">;
