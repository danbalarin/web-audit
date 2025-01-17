import {
	BaseModule,
	BaseStorage,
	ModuleProcessor,
	ModuleProcessorState,
} from "@repo/api";
import { Browser } from "puppeteer";
import z from "zod";
import { moduleLogger } from "~/lib/logger";

import { browserProcedure } from "~/server/trpc";

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
	modules: BaseModule[];
	browser: Browser;
	storage: BaseStorage<ModuleProcessorState>;
};

const processUrl = async ({
	input,
	browser,
	modules,
	storage,
}: ProcessUrlOptions): Promise<ProcessUrlResponse> => {
	const { url } = input;
	try {
		const processor = new ModuleProcessor({
			storage,
			modules,
			logger: moduleLogger,
		});
		const id = processor.process({ browser, url });

		return {
			ok: true,
			id,
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

export const procedure = browserProcedure
	.input(inputSchema)
	.mutation(({ input, ctx }) =>
		processUrl({
			input,
			browser: ctx.browser,
			modules: ctx.modules,
			storage: ctx.storage,
		}),
	);
