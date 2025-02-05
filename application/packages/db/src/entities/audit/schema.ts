import { sql } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";

export const audits = p.pgTable("audits", {
	id: p.serial("id").primaryKey(),
	created_at: p.timestamp("created_at").default(sql`now()`),
});
