import { electricSync } from "@electric-sql/pglite-sync";
import { PGliteWorker } from "@electric-sql/pglite/worker";

export async function createPGlite(electricBaseUrl: string) {
	if (typeof Worker === "undefined") {
		return;
	}
	const worker = new PGliteWorker(
		new Worker(new URL("./worker.ts", import.meta.url), {
			type: "module",
		}),
		{
			dataDir: "idb://audit",
			debug: 1,
			extensions: {
				sync: electricSync({ debug: true }),
			},
			meta: {
				electricBaseUrl,
			},
		},
	);

	return worker;
}
