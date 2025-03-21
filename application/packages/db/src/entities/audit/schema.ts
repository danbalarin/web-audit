import type { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { jobs } from "../job/schema";
import { id } from "../utils/id";
import { timestamps } from "../utils/timestamps";

export const audits = pgTable("audits", {
	...id,
	...timestamps,
	jobId: uuid("job_id")
		.references(() => jobs.id, { onDelete: "cascade" })
		.notNull(),
	url: varchar("url").notNull(),
});

export type Audit = Omit<InferSelectModel<typeof audits>, "deletedAt">;
