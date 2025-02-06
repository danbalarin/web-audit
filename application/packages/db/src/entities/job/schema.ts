import { pgTable, uuid } from "drizzle-orm/pg-core";
import { projects } from "../project/schema";
import { id } from "../utils/id";
import { timestamps } from "../utils/timestamps";

export const jobs = pgTable("jobs", {
	...id,
	...timestamps,
	projectId: uuid("project_id")
		.references(() => projects.id, { onDelete: "cascade" })
		.notNull(),
});
