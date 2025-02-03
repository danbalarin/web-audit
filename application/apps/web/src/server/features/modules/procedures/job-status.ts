import { BaseStorage, ModuleProcessorState } from "@repo/api";
import z from "zod";
import { baseProcedure } from "~/server/trpc/procedure";

const inputSchema = z.object({
	id: z.string(),
});

type JobStatusInput = z.infer<typeof inputSchema>;

type JobStatusOkResponse = {
	ok: true;
	id: string;
	data: Omit<ModuleProcessorState, "result">;
};

type JobStatusErrorResponse = {
	ok: false;
	id: string;
	error: string;
};

type JobStatusResponse = JobStatusOkResponse | JobStatusErrorResponse;

type JobStatusOptions = {
	input: JobStatusInput;
	storage: BaseStorage<ModuleProcessorState>;
};

const jobStatus = async ({
	input,
	storage,
}: JobStatusOptions): Promise<JobStatusResponse> => {
	const { id } = input;
	try {
		const data = await storage.get(id);

		if (!data) {
			throw new Error("Job not found");
		}

		return {
			ok: true,
			id,
			data: { id: data.id, meta: data.meta },
		};
		// biome-ignore lint/suspicious/noExplicitAny: error handling
	} catch (error: any) {
		return {
			ok: false,
			id: "",
			error: error?.message || "Unknown error",
		};
	}
};

export const procedure = baseProcedure
	.input(inputSchema)
	.query(({ input, ctx }) => jobStatus({ input, storage: ctx.storage }));
