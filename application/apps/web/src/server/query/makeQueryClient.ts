import {
	QueryClient,
	defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { deserialize, serialize } from "superjson";
import { appRouter } from "../router";

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30 * 1000,
				retry(failureCount, error) {
					if (
						(error.name === "TRPCClientError" &&
							(error as TRPCClientError<typeof appRouter>).data?.code ===
								"NOT_FOUND") ||
						(error.name === "TRPCError" &&
							(error as TRPCError).code === "NOT_FOUND")
					) {
						return false;
					}

					return failureCount < 3;
				},
			},
			dehydrate: {
				serializeData: serialize,
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
			hydrate: {
				deserializeData: deserialize,
			},
		},
	});
}
