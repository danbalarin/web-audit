import { TRPCError } from "@trpc/server";
import { trpcLogger } from "~/lib/logger";

export const errorHandler = <TVal>(fn: () => TVal | Promise<TVal>) => {
	try {
		return fn();
		// biome-ignore lint/suspicious/noExplicitAny: error handling
	} catch (error: any) {
		if (error instanceof TRPCError) {
			throw error;
		} else {
			trpcLogger.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Unknown error",
				cause: error,
			});
		}
	}
};
