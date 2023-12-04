import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";

type Context = CreateNextContextOptions & {
  /**
   * Used for routine executions, such as local scripts, webhooks, or cron jobs.
   */
  bypassSecurity?: true;
};

/**
 * Initialized tRPC API.
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export { t };
