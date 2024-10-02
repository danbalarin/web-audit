import { ExtractArray, CombineUnion } from "@repo/api";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { createBrowserContext } from "./browser";
import { createModulesContext } from "./modules";
import { createStorageContext } from "./storage";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const browserContext = createBrowserContext();
  const modulesContext = createModulesContext();
  const storageContext = createStorageContext();

  const results = await Promise.all([
    browserContext,
    modulesContext,
    storageContext,
  ]);

  return results.reduce<CombineUnion<ExtractArray<typeof results>>>(
    (acc, curr) => ({ ...acc, ...curr }),
    {} as any
  );
};
