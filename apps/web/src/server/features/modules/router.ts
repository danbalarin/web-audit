import { t } from "~/server/trpc";

import { procedure as processUrlProcedure } from "./procedures/process-url";

export const router = t.router({
  processUrl: processUrlProcedure,
});
