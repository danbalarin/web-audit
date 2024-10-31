import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { createTRPCContext } from "../context";

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = t.middleware;

export const createTRPCRouter = t.router;

export const baseProcedure = t.procedure;

export const createCallerFactory = t.createCallerFactory;
