import { BaseStorage, ModuleProcessorState } from "@repo/api";
import z from "zod";

import { baseProcedure } from "~/server/trpc/init";

const inputSchema = z.object({
  id: z.string(),
});

type JobStatusInput = z.infer<typeof inputSchema>;

type JobStatusOkResponse = {
  ok: true;
  id: string;
  data: ModuleProcessorState;
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
      data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
