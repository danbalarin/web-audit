import { BaseModule } from "@repo/api";
import { Browser } from "puppeteer";
import { v4 as uuid } from "uuid";
import z from "zod";

import { baseProcedure } from "~/server/trpc/init";

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
};

const processUrl = async ({
  input,
  browser,
  modules,
}: ProcessUrlOptions): Promise<ProcessUrlResponse> => {
  // TODO: Use ModuleProcessor
  const { url } = input;
  try {
    const id = uuid();
    const process = async () => {
      const data = {} as Record<string, any>;
      for (const [name, module] of Object.entries(modules)) {
        console.log(`Executing module ${name}, ${id}`);
        const onChange = (...args: any[]) => {
          console.log(`Module ${name} changed`);
          console.log(args);
        };
        module.on("gatherer:progress", onChange);
        const res = await module.executeGatherers({ browser, url });
        data[name] = res;
      }
    };

    process();

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
    processUrl({ input, browser: ctx.browser, modules: ctx.modules })
  );
