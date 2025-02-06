import { InferSelectModel } from "drizzle-orm";
import { integer, json, pgTable, uuid } from "drizzle-orm/pg-core";
import { projects } from "../project/schema";
import { id } from "../utils/id";
import { timestamps } from "../utils/timestamps";

export const jobs = pgTable("jobs", {
	...id,
	...timestamps,
	projectId: uuid("project_id")
		.references(() => projects.id, { onDelete: "cascade" })
		.notNull(),
	progress: integer("progress").default(0).notNull(),
	error: json("error"),
	moduleStatuses: json("module_statuses").default({}).notNull(),
});

export type Job = Omit<InferSelectModel<typeof jobs>, "deletedAt">;
