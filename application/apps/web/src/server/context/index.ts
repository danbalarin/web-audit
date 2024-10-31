import type { CombineUnion, ExtractArray } from "@repo/api";
import { cache } from "react";

import { createBrowserContext } from "./browser";
import { createModulesContext } from "./modules";
// import { createStorageContext } from "./storage";

/**
 * @see: https://trpc.io/docs/server/context
 */
export const createTRPCContext = cache(async () => {
  const browserContext = createBrowserContext();
  const modulesContext = createModulesContext();
  // const storageContext = createStorageContext();

  const results = await Promise.all([
    browserContext,
    modulesContext,
    // storageContext,
  ]);

  return results.reduce<CombineUnion<ExtractArray<typeof results>>>(
    (acc, curr) => ({ ...acc, ...curr }),
    {} as any
  );
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
