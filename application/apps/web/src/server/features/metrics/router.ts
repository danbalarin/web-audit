import { createTRPCRouter } from "~/server/trpc";

import { procedure as updateProcedure } from "./procedures/update";

export const router = createTRPCRouter({
	update: updateProcedure,
});
