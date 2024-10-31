import { middleware } from "../trpc/init";

export const executionTimeMiddleware = middleware(async ({ next, meta }) => {
  const start = Date.now();

  const result = await next();

  return {
    ...result,
    executionTime: Date.now() - start,
  };
});
