import type { ProjectService } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { errorHandler } from "~/server/error/errorHandler";
import { dbProcedure } from "~/server/trpc/procedure";

const inputSchema = z.object({
	id: z.string(),
});

type FindAllOptions = {
	input: z.infer<typeof inputSchema>;
	projectService: ProjectService;
};

const findById = async ({ input: { id }, projectService }: FindAllOptions) => {
	return errorHandler(async () => {
		const data = await projectService.findById(id);
		if (!data) {
			throw new TRPCError({
				code: "NOT_FOUND",
			});
		}
		return data;
	});
};

export const procedure = dbProcedure
	.input(inputSchema)
	.query(({ input, ctx }) =>
		findById({ input, projectService: ctx.projectService }),
	);
