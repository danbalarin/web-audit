import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { projects } from "../project/schema";
import { id } from "../utils/id";
import { timestamps } from "../utils/timestamps";

export const audits = pgTable("audits", {
	...id,
	...timestamps,
	project_id: uuid("project_id")
		.references(() => projects.id, { onDelete: "cascade" })
		.notNull(),
	url: varchar("url").notNull(),
});
