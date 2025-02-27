import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { schema } from "../schema";

const createQueryClient = (connectionString: string) =>
	new pg.Pool({
		connectionString,
		ssl: process.env.PG_SSL_REQUIRE === "true" ? true : undefined,
	});

export const createDb = (connectionString: string) =>
	drizzle(createQueryClient(connectionString), { schema });
