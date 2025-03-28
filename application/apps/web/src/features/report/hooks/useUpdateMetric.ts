import deepmerge from "deepmerge";
import { trpc } from "~/server/query/client";

type UpdateMetricVariables = {
	projectId?: string;
	metricId?: string;
};

export const useUpdateMetric = (
	{ metricId, projectId }: UpdateMetricVariables,
	options?: Parameters<typeof trpc.metrics.update.useMutation>[0],
) => {
	const utils = trpc.useUtils();
	return trpc.metrics.update.useMutation({
		...options,
		onMutate: ({ additionalData, value }) => {
			if (!projectId || !metricId) {
				return;
			}
			const oldData = utils.projects.findById.getData({ id: projectId });
			if (!oldData) {
				return;
			}
			const jobIndex = oldData.jobs.findIndex((job) =>
				job.audits.some((a) => a.metrics.some((m) => m.id === metricId)),
			);
			if (jobIndex === -1) {
				return;
			}
			const auditIndex = oldData.jobs[jobIndex]!.audits.findIndex((audit) =>
				audit.metrics.some((m) => m.id === metricId),
			);
			if (auditIndex === -1) {
				return;
			}
			const metricIndex = oldData.jobs[jobIndex]!.audits[
				auditIndex
			]!.metrics.findIndex((m) => m.id === metricId);
			if (metricIndex === -1) {
				return;
			}
			const newData = JSON.parse(JSON.stringify(oldData)) as typeof oldData; // Deep clone
			newData.jobs[jobIndex]!.audits[auditIndex]!.metrics[metricIndex] =
				deepmerge(
					// @ts-ignore
					newData.jobs[jobIndex]!.audits[auditIndex]!.metrics[metricIndex],
					{
						value: value?.toString(),
						additionalData: additionalData,
					},
				);

			if (oldData) {
				utils.projects.findById.setData({ id: projectId }, newData);
			}
		},
		onSuccess: () => {
			utils.projects.findById.invalidate();
		},
	});
};
