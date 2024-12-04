import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import type { TRPCContext } from "../context";

const t = initTRPC.context<TRPCContext>().create({
	transformer: superjson,
});

export const middleware = t.middleware;

export const createTRPCRouter = t.router;

export const baseProcedure = t.procedure;

export const createCallerFactory = t.createCallerFactory;
