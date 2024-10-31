import z from "zod";

import { executionTimeProcedure } from "~/server/trpc";

const inputSchema = z.object({
  url: z.string().url(),
});

type ScrapeFetchInput = z.infer<typeof inputSchema>;

type ScrapeFetchResponse = {
  ok: boolean;
  document: string;
  error?: string;
};

const scrapeFetch = async (
  input: ScrapeFetchInput,
): Promise<ScrapeFetchResponse> => {
  try {
    const response = await fetch(input.url);

    return {
      ok: response.ok,
      document: await response.text(),
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
  .query(({ input }) => scrapeFetch(input));
