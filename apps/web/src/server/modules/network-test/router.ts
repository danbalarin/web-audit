import { t } from "~/server/trpc";

import { procedure as testUrlProcedure } from "./procedures/test-url";

export const router = t.router({
  testUrl: testUrlProcedure,
});
