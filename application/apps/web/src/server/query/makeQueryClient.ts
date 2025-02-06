import {
	QueryClient,
	defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { deserialize, serialize } from "superjson";

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30 * 1000,
				retry(failureCount, error) {
					if (
						error instanceof TRPCClientError &&
						error.data?.code === "NOT_FOUND"
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
