import { RedisStorage, ModuleProcessorState } from "@repo/api";

import { env } from "~/env.mjs";

export const createStorageContext = async () => {
  const storage = new RedisStorage<ModuleProcessorState>({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  });

  return {
    storage,
  };
};
