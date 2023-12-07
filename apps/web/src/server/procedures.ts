import { executionTimeMiddleware } from "./middlewares/executionTime";
import { t } from "./trpc";

export const baseProcedure = t.procedure;

export const executionTimeProcedure = t.procedure.use(executionTimeMiddleware);
