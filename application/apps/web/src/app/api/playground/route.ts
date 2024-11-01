import { fetchHandler } from "trpc-playground/handlers/fetch";

import { appRouter } from "~/server";

import { zodResolveTypes } from "./trpc-playground-fix";

const handler = await fetchHandler({
  router: appRouter,
  trpcApiEndpoint: "/api/trpc",
  playgroundEndpoint: "/api/playground",
  resolveTypes: zodResolveTypes,
  request: {
    superjson: true,
  },
});

export const runtime = "edge";

export { handler as GET, handler as POST };
