import { router as networkTest } from "./modules/network-test";
import { t } from "./trpc";

/**
 * This is the primary router for your server.
 */
const appRouter = t.router({
  networkTest,
});

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
