import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { createBrowserContext } from "./browser";
import { createModulesContext } from "./modules";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const browserContext = createBrowserContext();
  const modulesContext = createModulesContext();

  const results = await Promise.all([browserContext, modulesContext]);

  return {
    ...results[0],
    ...results[1],
  };
};
