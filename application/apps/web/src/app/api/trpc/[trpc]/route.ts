import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createContext } from "~/server";

/**
 * /api/trpc/*
 *
 * tRPC handler.
 */
const handler = (req: any, res: any) => {
  return fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  });
};

export { handler as GET, handler as POST };
