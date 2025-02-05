import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readMigrationFiles } from "drizzle-orm/migrator";

const migrations = readMigrationFiles({
	migrationsFolder: join(import.meta.dirname, "../migrations/"),
});

await writeFile(
	join(import.meta.dirname, "../migrations/migrations.json"),
	JSON.stringify(migrations),
);

console.log("Migrations compiled!");
