import type { Project, ProjectService } from "@repo/db";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { dbProcedure } from "~/server/trpc/procedure";

const inputSchema = z.object({
	name: z.string(),
	homeUrl: z.string(),
	urls: z.array(z.string()),
});

type CreateInput = z.infer<typeof inputSchema>;

type CreateOptions = {
	input: CreateInput;
	projectService: ProjectService;
};

const create = async ({
	input,
	projectService,
}: CreateOptions): Promise<Project> => {
	try {
		const data = (await projectService.create(input))[0];

		if (!data) {
			throw new Error("Failed to create project");
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
		create({ input, projectService: ctx.projectService }),
	);
