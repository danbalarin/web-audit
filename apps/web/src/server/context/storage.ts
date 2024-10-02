import { MemoryStorage } from "@repo/api";

export const createStorageContext = async () => {
  const storage = new MemoryStorage();

  return {
    storage,
  };
};
