import type { ProjectService } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { dbProcedure } from "~/server/trpc/procedure";

const inputSchema = z.object({
	id: z.string(),
});

type DeleteOptions = {
	input: z.infer<typeof inputSchema>;
	projectService: ProjectService;
};

const deleteProject = async ({
	input: { id },
	projectService,
}: DeleteOptions) => {
	const data = await projectService.delete(id);

	if (!data) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Project not found",
		});
	}

	return data;
};

export const procedure = dbProcedure
	.input(inputSchema)
	.mutation(({ input, ctx }) =>
		deleteProject({ input, projectService: ctx.projectService }),
	);
