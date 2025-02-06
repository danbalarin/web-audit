import { Project, ProjectService } from "@repo/db";
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
}: DeleteOptions): Promise<Project> => {
	try {
		const data = await projectService.delete(id);

		if (!data) {
			throw new Error("Failed to get project");
		}

		return data;
	} catch (error) {
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Unknown error",
			cause: error,
		});
	}
};

export const procedure = dbProcedure
	.input(inputSchema)
	.mutation(({ input, ctx }) =>
		deleteProject({ input, projectService: ctx.projectService }),
	);
