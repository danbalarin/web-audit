import { PGlite } from "@electric-sql/pglite";
import { electricSync } from "@electric-sql/pglite-sync";
import { migrate } from "./migrate";

import { PGliteWorkerOptions, worker } from "@electric-sql/pglite/worker";
import { drizzle } from "drizzle-orm/pglite";
import { syncTables } from "./syncTables";

worker({
	async init(options: PGliteWorkerOptions) {
		const pg = await PGlite.create({
			dataDir: options.dataDir,
			fs: options.fs,
			extensions: {
				electric: electricSync({ debug: options?.debug !== undefined }),
			},
			debug: options.debug,
		});

		const db = drizzle(pg);

		await migrate(db);
		await syncTables(pg, options.meta.electricBaseUrl);

		return pg;
	},
});
