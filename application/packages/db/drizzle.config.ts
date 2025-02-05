import { defineConfig } from "drizzle-kit";

// TODO: dockerise
export const connectionString = `postgresql://postgres:password@localhost:5432/electric?sslmode=disable`;
// export const poolConnectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${PG_BOUNCER_PORT}/${POSTGRES_DB}?sslmode=disable`;

export default defineConfig({
	out: "./migrations",
	schema: "./src/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: connectionString,
	},
});
