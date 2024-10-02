import { t } from "~/server/trpc";

import { procedure as processUrlProcedure } from "./procedures/process-url";
import { procedure as statusProcedure } from "./procedures/status";

export const router = t.router({
  processUrl: processUrlProcedure,
  status: statusProcedure,
});
