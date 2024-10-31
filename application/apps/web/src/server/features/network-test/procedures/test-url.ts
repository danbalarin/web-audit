import z from "zod";

import { executionTimeProcedure } from "~/server/trpc";

const inputSchema = z.object({
  url: z.string().url(),
});

type TestUrlInput = z.infer<typeof inputSchema>;

type TestUrlResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  rtt: number;
  error?: string;
};

const testUrl = async (input: TestUrlInput): Promise<TestUrlResponse> => {
  const start = Date.now();
  try {
    const response = await fetch(input.url);
    const end = Date.now();

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      rtt: end - start,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const end = Date.now();

    console.error(error); // TODO: proper tracking

    return {
      ok: false,
      status: 0,
      statusText: "",
      rtt: end - start,
      error: error?.message || "Unknown error",
    };
  }
};

export const procedure = executionTimeProcedure
  .input(inputSchema)
  .query(({ input }) => testUrl(input));
