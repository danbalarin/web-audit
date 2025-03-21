import type { InferSelectModel } from "drizzle-orm";
import { jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { audits } from "../audit/schema";
import { id } from "../utils/id";
import { timestamps } from "../utils/timestamps";

export const metrics = pgTable("metrics", {
	...id,
	createdAt: timestamps.createdAt,
	auditId: uuid("audit_id")
		.references(() => audits.id, { onDelete: "cascade" })
		.notNull(),
	metric: varchar("metric").notNull(),
	category: varchar("category").notNull(),
	value: varchar("value").notNull(),
	additionalData: jsonb("additional_data").$type<object>(),
});

export type Metric = InferSelectModel<typeof metrics>;
