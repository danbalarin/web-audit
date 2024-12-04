import { browserMiddleware } from "../middlewares/browser";
import { executionTimeMiddleware } from "../middlewares/executionTime";

import { baseProcedure } from "./init";

export const procedure = baseProcedure;

export const executionTimeProcedure = procedure.use(executionTimeMiddleware);

export const browserProcedure = procedure.use(browserMiddleware);
