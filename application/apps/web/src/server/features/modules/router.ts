import { createTRPCRouter } from "~/server/trpc";

import { procedure as processUrlProcedure } from "./procedures/process-url";

export const router = createTRPCRouter({
  processUrl: processUrlProcedure,
});
