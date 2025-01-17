import z from "zod";

import { browserProcedure } from "~/server/trpc";

const inputSchema = z.object({
	url: z.string().url(),
});

type ScrapeBrowserResponse = {
	ok: boolean;
	document: string;
	error?: string;
};

export const procedure = browserProcedure
	.input(inputSchema)
	.query<ScrapeBrowserResponse>(async ({ input, ctx }) => {
		try {
			const page = await ctx.browser.newPage();
			await page.goto(input.url, { waitUntil: "networkidle0" });
			const data = await page.evaluate(
				// eslint-disable-next-line no-undef
				() => document.querySelector("*")?.outerHTML,
			);
			await page.close();
			await ctx.browser.close();

			return {
				ok: !!data,
				document: data ?? "",
			};
			// biome-ignore lint/suspicious/noExplicitAny: just logging the error
		} catch (error: any) {
			console.error(error); // TODO: proper tracking

			return {
				ok: false,
				document: "",
				error: error?.message ?? "Unknown error",
			};
		}
	});
