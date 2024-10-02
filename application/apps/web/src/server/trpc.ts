import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { Context } from "./types/Context";

/**
 * Initialized tRPC API.
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export { t };
