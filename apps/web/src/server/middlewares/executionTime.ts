import { t } from "../trpc";

export const executionTimeMiddleware = t.middleware(async ({ next, meta }) => {
  const start = Date.now();

  const result = await next();

  return {
    ...result,
    executionTime: Date.now() - start,
  };
});
