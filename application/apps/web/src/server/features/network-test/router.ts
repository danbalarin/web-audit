import { createTRPCRouter } from "~/server/trpc";

import { procedure as testUrlProcedure } from "./procedures/test-url";

export const router = createTRPCRouter({
  testUrl: testUrlProcedure,
});
