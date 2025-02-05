import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { connectionString } from "../../drizzle.config";
import { schema } from "../schema";

export const queryClient = new pg.Pool({
	connectionString,
	ssl: process.env.PG_SSL_REQUIRE === "true" ? true : undefined,
});

export const db = drizzle(queryClient, { schema });
