import { defineConfig } from "drizzle-kit";

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

export const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}?sslmode=disable`;

export default defineConfig({
	out: "./migrations",
	schema: "./src/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: connectionString,
	},
});
