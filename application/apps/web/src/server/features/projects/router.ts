import { createTRPCRouter } from "~/server/trpc";

import { procedure as createProcedure } from "./procedures/create";
import { procedure as deleteProcedure } from "./procedures/delete";
import { procedure as deleteAuditProcedure } from "./procedures/deleteAudit";
import { procedure as findAllProcedure } from "./procedures/findAll";
import { procedure as findByIdProcedure } from "./procedures/findById";

export const router = createTRPCRouter({
	create: createProcedure,
	findAll: findAllProcedure,
	findById: findByIdProcedure,
	delete: deleteProcedure,
	deleteAudit: deleteAuditProcedure,
});
