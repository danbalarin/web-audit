import { uuid } from "drizzle-orm/pg-core";

export const id = {
	id: uuid("id").defaultRandom().primaryKey(),
};
