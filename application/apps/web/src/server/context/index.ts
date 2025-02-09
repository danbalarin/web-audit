import type { CombineUnion, ExtractArray } from "@repo/api/types";
import { cache } from "react";

import { createModulesContext } from "./modules";

/**
 * @see: https://trpc.io/docs/server/context
 */
export const createTRPCContext = cache(async () => {
	const modulesContext = createModulesContext();

	const results = await Promise.all([modulesContext]);

	return results.reduce<CombineUnion<ExtractArray<typeof results>>>(
		(acc, curr) => ({ ...acc, ...curr }),
		{} as CombineUnion<ExtractArray<typeof results>>,
	);
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
