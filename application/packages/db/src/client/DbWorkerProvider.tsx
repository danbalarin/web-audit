"use client";
import { PGliteProvider } from "@electric-sql/pglite-react";
import { PGliteWithLive } from "@electric-sql/pglite/live";
import { useEffect, useState } from "react";
import { createDb } from "./createDb";
import { createPGlite } from "./createPGlite";
import { migrate } from "./migrate";

type DbWorkerProviderProps = {
	children: React.ReactNode;
	electricSqlBaseUrl: string;
	onLoad?: () => void;
};

export function DbWorkerProvider({
	children,
	electricSqlBaseUrl,
	onLoad,
}: DbWorkerProviderProps) {
	const [pg, setPG] = useState<PGliteWithLive>();

	const setPGlite = async () => {
		const worker = await createPGlite(electricSqlBaseUrl);

		if (!worker) {
			return;
		}

		const db = await createDb(worker);

		await migrate(db);

		Object.defineProperty(worker, "_db", {
			value: db,
			writable: false,
		});

		// @ts-ignore
		setPG(worker);
		onLoad && onLoad();
	};

	useEffect(() => {
		if (pg) return;
		setPGlite();
	}, [pg]);

	if (!pg) return null;

	return <PGliteProvider db={pg}>{children}</PGliteProvider>;
}
