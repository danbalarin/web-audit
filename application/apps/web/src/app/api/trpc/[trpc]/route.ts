import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { trpcLogger } from "~/lib/logger";

import { appRouter, createTRPCContext } from "~/server";

const handler = (req: Request) => {
	return fetchRequestHandler({
		req,
		endpoint: "/api/trpc",
		router: appRouter,
		createContext: createTRPCContext,
		onError: ({ error, path }) => {
			trpcLogger.error(error, `Error in tRPC handler on path: ${path}`);
		},
	});
};

export { handler as GET, handler as POST };
