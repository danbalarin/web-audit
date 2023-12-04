import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextApiRequest, NextApiResponse } from "next";

import { appRouter } from "~/server";

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
    createContext: (ctx) => ({ ...ctx, res }) as any,
  });
};

export { handler as GET, handler as POST };
