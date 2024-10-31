import z from "zod";

import { TRPCContext } from "~/server/context";
import { executionTimeProcedure } from "~/server/trpc";

const inputSchema = z.object({
  url: z.string().url(),
});

type ScrapeBrowserInput = z.infer<typeof inputSchema>;

type ScrapeBrowserResponse = {
  ok: boolean;
  document: string;
  error?: string;
};

const scrapeBrowser = async (
  input: ScrapeBrowserInput,
  ctx: TRPCContext
): Promise<ScrapeBrowserResponse> => {
  try {
    const page = await ctx.browser.newPage();
    await page.goto(input.url, { waitUntil: "networkidle0" });
    const data = await page.evaluate(
      // eslint-disable-next-line no-undef
      () => document.querySelector("*")?.outerHTML
    );
    await page.close();

    return {
      ok: !!data,
      document: data ?? "",
    };
  } catch (error: any) {
    console.error(error); // TODO: proper tracking

    return {
      ok: false,
      document: "",
      error: error?.message || "Unknown error",
    };
  }
};

export const procedure = executionTimeProcedure
  .input(inputSchema)
  .query(({ input, ctx }) => scrapeBrowser(input, ctx));
