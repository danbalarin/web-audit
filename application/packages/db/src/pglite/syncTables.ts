import { PGliteInterface } from "@electric-sql/pglite";

type TablesToSync = {
	shape?: string;
	table: string;
	primaryKey?: string[];
}[];

const tablesToSync: TablesToSync = [
	{
		table: "audits",
		primaryKey: ["id"],
	},
];

export async function syncTables(pg: PGliteInterface, electricBaseUrl: string) {
	const syncStart = performance.now();
	await Promise.all(
		tablesToSync.map(({ shape, table, primaryKey }) => {
			//@ts-ignore
			pg.electric?.syncShapeToTable({
				shape: { url: `${electricBaseUrl}/shape?table=${shape || table}` },
				table,
				primaryKey: primaryKey ?? ["id"],
			});
		}),
	);

	console.info(
		`✅ Local database synced in ${performance.now() - syncStart}ms`,
	);
}
