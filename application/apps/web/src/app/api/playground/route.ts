import { fetchHandler } from "trpc-playground/handlers/fetch";

import { appRouter } from "~/server";

const handler = await fetchHandler({
  router: appRouter,
  trpcApiEndpoint: "/api/trpc",
  playgroundEndpoint: "/api/playground",
  request: {
    superjson: true,
  },
});

export { handler as GET, handler as POST };
