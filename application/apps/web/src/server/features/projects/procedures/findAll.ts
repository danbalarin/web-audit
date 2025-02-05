import { Project, ProjectService } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { dbProcedure } from "~/server/trpc/procedure";

type FindAllOptions = {
	projectService: ProjectService;
};

const findAll = async ({
	projectService,
}: FindAllOptions): Promise<Project[]> => {
	try {
		const data = await projectService.findAll();

		if (!data) {
			throw new Error("Failed to get projects");
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

export const procedure = dbProcedure.query(({ ctx }) =>
	findAll({ projectService: ctx.projectService }),
);
