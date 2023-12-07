import { router as networkTest } from "./modules/network-test";
import { router as scraper } from "./modules/scraper";
import { t } from "./trpc";

/**
 * This is the primary router for your server.
 */
const appRouter = t.router({
  networkTest,
  scraper,
});

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
