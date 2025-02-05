import { createTRPCRouter } from "~/server/trpc";

import { procedure as createProcedure } from "./procedures/create";
import { procedure as findAllProcedure } from "./procedures/findAll";

export const router = createTRPCRouter({
	create: createProcedure,
	findAll: findAllProcedure,
});
