import { router as modules } from "./features/modules";
import { router as networkTest } from "./features/network-test";
import { router as projects } from "./features/projects";
import { router as scraper } from "./features/scraper";
import { createTRPCRouter } from "./trpc";

const appRouter = createTRPCRouter({
	networkTest,
	scraper,
	modules,
	projects,
});

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
