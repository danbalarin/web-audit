"use client";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import superjson from "superjson";
import { env } from "~/env.mjs";
import { trpcLogger } from "~/lib/logger";
import type { AppRouter } from "../router";
import { makeQueryClient } from "./makeQueryClient";

export const trpc = createTRPCReact<AppRouter>();
let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient();
	}

	// Browser: use singleton pattern to keep the same query client
	if (!clientQueryClientSingleton) {
		clientQueryClientSingleton = makeQueryClient();
	}
	return clientQueryClientSingleton;
}

function getUrl() {
	const base = (() => {
		if (typeof window !== "undefined") {
			return "";
		}
		if (process.env.VERCEL_URL) {
			return `https://${process.env.VERCEL_URL}`;
		}

		if (env.BASE_URL) {
			return env.BASE_URL;
		}

		return "http://localhost:3000";
	})();

	return `${base}/api/trpc`;
}

export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCProvider(
	props: Readonly<{
		children: React.ReactNode;
	}>,
) {
	// NOTE: Avoid useState when initializing the query client if you don't
	//       have a suspense boundary between this and the code that may
	//       suspend because React will throw away the client on the initial
	//       render if it suspends and there is no boundary
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				loggerLink({
					console: {
						log: (message, args) => trpcLogger.debug(args, message),
						error: (message, args) => trpcLogger.error(args, message),
					},
					colorMode: "none",
				}),
				httpBatchLink({
					transformer: superjson,
					url: getUrl(),
				}),
			],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{props.children}
			</QueryClientProvider>
		</trpc.Provider>
	);
}
