import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "~/server";

const handler = (req: Request) => {
  return fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: createTRPCContext,
  });
};

export { handler as GET, handler as POST };
