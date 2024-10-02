import { BaseModule, ModuleProcessor } from "@repo/api";
import { Browser } from "puppeteer";
import z from "zod";

import { baseProcedure } from "../../../procedures";

const inputSchema = z.object({
  url: z.string().url(),
});

type ProcessUrlInput = z.infer<typeof inputSchema>;

type ProcessUrlResponse = {
  ok: boolean;
  id: string;
  error?: string;
};

type ProcessUrlOptions = {
  input: ProcessUrlInput;
  modules: Record<string, BaseModule>;
  browser: Browser;
  processor: ModuleProcessor;
};

const processUrl = async ({
  input,
  browser,
  modules,
  processor,
}: ProcessUrlOptions): Promise<ProcessUrlResponse> => {
  const { url } = input;

  try {
    const id = processor.process(modules, { browser, url });

    return {
      ok: true,
      id,
    };
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
  .query(({ input, ctx }) =>
    processUrl({
      input,
      browser: ctx.browser,
      modules: ctx.modules,
      processor: ctx.moduleProcessor,
    })
  );
