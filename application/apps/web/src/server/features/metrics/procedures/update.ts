import type { Metric, MetricService } from "@repo/db";
import { TRPCError } from "@trpc/server";
import deepmerge from "deepmerge";
import z from "zod";

import { dbProcedure } from "~/server/trpc/procedure";

const inputSchema = z.object({
	id: z.string(),
	value: z.string().optional(),
	additionalData: z.object({}).passthrough().optional(),
});

type UpdateInput = z.infer<typeof inputSchema>;

type UpdateOptions = {
	input: UpdateInput;
	metricService: MetricService;
};

const update = async ({
	input,
	metricService,
}: UpdateOptions): Promise<Metric> => {
	try {
		const data = await metricService.findById(input.id);

		if (!data) {
			throw new Error("Failed to update metric");
		}

		const newValue = input.value ?? data.value;
		const newAdditionalData = deepmerge(
			data.additionalData ?? {},
			input.additionalData ?? {},
		);

		const updatedData = await metricService.update(input.id, {
			value: newValue,
			additionalData: newAdditionalData,
		});
		if (!updatedData[0]) {
			throw new Error("Failed to update metric");
		}

		return updatedData[0];
	} catch (error) {
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Unknown error",
			cause: error,
		});
	}
};

export const procedure = dbProcedure
	.input(inputSchema)
	.mutation(({ input, ctx }) =>
		update({ input, metricService: ctx.metricService }),
	);
