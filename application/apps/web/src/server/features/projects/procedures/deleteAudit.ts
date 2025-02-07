import { AuditService } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { dbProcedure } from "~/server/trpc/procedure";

const inputSchema = z.object({
	id: z.string(),
});

type DeleteOptions = {
	input: z.infer<typeof inputSchema>;
	auditService: AuditService;
};

const deleteAudit = async ({ input: { id }, auditService }: DeleteOptions) => {
	const data = await auditService.delete(id);

	if (!data) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Audit not found",
		});
	}

	return data;
};

export const procedure = dbProcedure
	.input(inputSchema)
	.mutation(({ input, ctx }) =>
		deleteAudit({ input, auditService: ctx.auditService }),
	);
