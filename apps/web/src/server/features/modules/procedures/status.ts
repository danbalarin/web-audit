import { ModuleProcessor, ModuleProcessorState } from "@repo/api";
import z from "zod";

import { baseProcedure } from "../../../procedures";

const inputSchema = z.object({
  id: z.string(),
});

type StatusInput = z.infer<typeof inputSchema>;

type StatusResponse = {
  ok: boolean;
  status: ModuleProcessorState["meta"];
  error?: string;
};

type StatusOptions = {
  input: StatusInput;
  processor: ModuleProcessor;
};

const status = async ({
  input,
  processor,
}: StatusOptions): Promise<StatusResponse> => {
  const { id } = input;

  try {
    const status = await processor.getStatus(id);

    if (!status) {
      throw new Error(`No status found for id: ${id}`);
    }

    return {
      ok: true,
      status,
    };
  } catch (error: any) {
    return {
      ok: false,
      status: { currentStep: "gatherers", progress: 0 },
      error: error?.message || "Unknown error",
    };
  }
};

export const procedure = baseProcedure
  .input(inputSchema)
  .query(({ input, ctx }) =>
    status({
      input,
      processor: ctx.moduleProcessor,
    })
  );
