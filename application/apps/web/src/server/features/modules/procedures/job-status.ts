import type { JobService } from "@repo/db";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { dbProcedure } from "~/server/trpc/procedure";

const inputSchema = z.object({
	id: z.string(),
});

type JobStatusInput = z.infer<typeof inputSchema>;

type JobStatusOptions = {
	input: JobStatusInput;
	jobService: JobService;
};

const jobStatus = async ({ input, jobService }: JobStatusOptions) => {
	const { id } = input;
	const data = await jobService.findById(id);

	if (!data) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Job not found",
		});
	}

	return {
		id: data.id,
		progress: data.progress,
		moduleStatuses: data.moduleStatuses,
	};
};

export const procedure = dbProcedure
	.input(inputSchema)
	.query(({ input, ctx }) => jobStatus({ input, jobService: ctx.jobService }));
