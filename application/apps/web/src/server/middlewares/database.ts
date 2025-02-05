import { ProjectService, db } from "@repo/db";
import { middleware } from "../trpc/init";

export const dbMiddleware = middleware(async ({ next, ctx }) => {
	try {
		return next({
			ctx: {
				...ctx,
				db,
				projectService: new ProjectService(db),
			},
		});
	} catch (error) {
		throw new Error(`Error creating db middleware`, { cause: error });
	}
});
