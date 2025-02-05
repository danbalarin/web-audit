import { browserMiddleware } from "../middlewares/browser";
import { dbMiddleware } from "../middlewares/database";
import { executionTimeMiddleware } from "../middlewares/executionTime";

import { _baseProcedure } from "./init";

export const baseProcedure = _baseProcedure;

export const executionTimeProcedure = baseProcedure.use(
	executionTimeMiddleware,
);

export const browserProcedure = baseProcedure.use(browserMiddleware);

export const dbProcedure = baseProcedure.use(dbMiddleware);
