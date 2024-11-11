import { RedisStorage, ModuleProcessorState } from "@repo/api";

export const createStorageContext = async () => {
  const storage = new RedisStorage<ModuleProcessorState>({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  return {
    storage,
  };
};
