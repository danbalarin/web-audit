import { router as modules } from "./features/modules";
import { router as networkTest } from "./features/network-test";
import { router as scraper } from "./features/scraper";
import { t } from "./trpc";

/**
 * This is the primary router for your server.
 */
const appRouter = t.router({
  networkTest,
  scraper,
  modules,
});

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
