import { PGliteWorker } from "@electric-sql/pglite/worker";
import { drizzle } from "drizzle-orm/pglite";
import { schema } from "../schema";

export const createDb = async (worker: PGliteWorker) => {
	// @ts-ignore
	return drizzle(worker, { schema });
};
