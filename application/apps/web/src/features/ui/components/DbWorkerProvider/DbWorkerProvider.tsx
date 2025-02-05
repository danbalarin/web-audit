"use client";
import { PGliteProvider } from "@electric-sql/pglite-react";
import { PGliteWithLive } from "@electric-sql/pglite/live";
import { createDb, createPGlite, migrate } from "@repo/db";
import { useEffect, useState } from "react";

import { env } from "~/env.mjs";

export function DbWorkerProvider({ children }: { children: React.ReactNode }) {
	const [pg, setPg] = useState<PGliteWithLive>();

	const setPglite = async () => {
		const worker = await createPGlite(env.NEXT_PUBLIC_ELECTRIC_SQL_BASE_URL);

		if (!worker) {
			return;
		}

		const db = await createDb(worker);

		// @ts-ignore
		await migrate(db);

		Object.defineProperty(worker, "_db", {
			value: db,
			writable: false,
		});

		// @ts-ignore
		setPg(worker);
	};

	useEffect(() => {
		if (pg) return;
		setPglite();
	}, [pg]);

	if (!pg) return <div>Loading</div>;

	return <PGliteProvider db={pg}>{children}</PGliteProvider>;
}
