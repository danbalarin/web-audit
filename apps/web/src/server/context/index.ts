import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { createBrowserContext } from "./browser";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const browserContext = createBrowserContext();

  return {
    ...browserContext,
  };
};
