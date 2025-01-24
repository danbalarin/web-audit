import { createTRPCRouter } from "~/server/trpc";

import { procedure as jobResultProcedure } from "./procedures/job-result";
import { procedure as jobStatusProcedure } from "./procedures/job-status";
import { procedure as processUrlProcedure } from "./procedures/process-url";

export const router = createTRPCRouter({
	processUrl: processUrlProcedure,
	jobStatus: jobStatusProcedure,
	jobResult: jobResultProcedure,
});
