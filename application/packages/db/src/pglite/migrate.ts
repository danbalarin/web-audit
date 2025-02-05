import { PgDialect } from "drizzle-orm/pg-core";
import { PgliteDatabase } from "drizzle-orm/pglite";
import migrations from "../../migrations/migrations.json";

export async function migrate(db: PgliteDatabase) {
	//prevent multiple schema migrations to be run
	let isLocalDBSchemaSynced = false;

	if (!isLocalDBSchemaSynced) {
		const start = performance.now();
		try {
			await new PgDialect().migrate(
				migrations,
				//@ts-ignore
				db._.session,
				{ migrationsFolder: "../../migrations" },
			);
			isLocalDBSchemaSynced = true;
			console.info(`✅ Local database ready in ${performance.now() - start}ms`);
		} catch (cause) {
			console.error("❌ Local database schema migration failed", cause);
			throw cause;
		}
	}

	return db;
}
