import { type BaseModule, ModuleProcessor } from "@repo/api";
import type { AuditService, JobService, MetricService } from "@repo/db";
import type { Browser } from "puppeteer";
import z from "zod";
import { moduleLogger } from "~/lib/logger";
import { dbMiddleware } from "~/server/middlewares/database";

import { browserProcedure } from "~/server/trpc";

const inputSchema = z.object({
	projectId: z.string(),
	url: z.string().url(),
});

type ProcessUrlInput = z.infer<typeof inputSchema>;

type ProcessUrlOptions = {
	input: ProcessUrlInput;
	modules: BaseModule[];
	createBrowser: () => Promise<Browser>;
	jobService: JobService;
	metricService: MetricService;
	auditService: AuditService;
};

const processUrl = async ({
	input,
	createBrowser,
	modules,
	jobService,
	metricService,
	auditService,
}: ProcessUrlOptions) => {
	const { url } = input;
	const processor = new ModuleProcessor({
		modules,
		logger: moduleLogger,
		jobService,
		metricService,
		auditService,
		projectId: input.projectId,
	});

	const id = await processor.process({ createBrowser, url });

	return id;
};

export const procedure = browserProcedure
	.use(dbMiddleware)
	.input(inputSchema)
	.mutation(({ input, ctx }) =>
		processUrl({
			input,
			createBrowser: ctx.createBrowser,
			modules: ctx.modules,
			jobService: ctx.jobService,
			metricService: ctx.metricService,
			auditService: ctx.auditService,
		}),
	);
