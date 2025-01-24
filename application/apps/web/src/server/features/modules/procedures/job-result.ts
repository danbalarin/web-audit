import { BaseStorage, ModuleProcessorState } from "@repo/api";
import z from "zod";
import { baseProcedure } from "~/server/trpc/procedure";

const inputSchema = z.object({
	id: z.string(),
});

type JobResultInput = z.infer<typeof inputSchema>;

type JobResultOkResponse = {
	ok: true;
	id: string;
	data: Pick<ModuleProcessorState, "modules">;
};

type JobResultErrorResponse = {
	ok: false;
	id: string;
	error: string;
};

type JobResultResponse = JobResultOkResponse | JobResultErrorResponse;

type JobResultOptions = {
	input: JobResultInput;
	storage: BaseStorage<ModuleProcessorState>;
};

const jobResult = async ({
	input,
	storage,
}: JobResultOptions): Promise<JobResultResponse> => {
	const { id } = input;
	try {
		const data = await storage.get(id);

		if (!data) {
			throw new Error("Job not found");
		}

		return {
			ok: true,
			id,
			data: { modules: data.modules },
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
	.query(({ input, ctx }) => jobResult({ input, storage: ctx.storage }));
