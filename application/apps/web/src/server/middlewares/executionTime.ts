import { middleware } from "../trpc/init";

export const executionTimeMiddleware = middleware(async ({ next }) => {
	const start = Date.now();

	const result = await next();

	return {
		...result,
		executionTime: Date.now() - start,
	};
});
