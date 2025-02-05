import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { audits } from "../audit/schema";
import { id } from "../utils/id";
import { timestamps } from "../utils/timestamps";

export const metrics = pgTable("metrics", {
	...id,
	created_at: timestamps.created_at,
	audit_id: uuid("audit_id")
		.references(() => audits.id, { onDelete: "cascade" })
		.notNull(),
	metric: varchar("metric").notNull(),
	category: varchar("category").notNull(),
	value: varchar("url").notNull(),
});
