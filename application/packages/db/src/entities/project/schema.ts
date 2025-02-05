import { pgTable, varchar } from "drizzle-orm/pg-core";
import { id } from "../utils/id";
import { timestamps } from "../utils/timestamps";

export const projects = pgTable("projects", {
	...id,
	...timestamps,
	name: varchar("name").notNull(),
	homeUrl: varchar("home_url").notNull(),
	urls: varchar("urls").array().notNull(),
});
