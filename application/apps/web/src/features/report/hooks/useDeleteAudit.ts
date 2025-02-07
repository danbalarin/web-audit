import { trpc } from "~/server/query/client";

export const useDeleteAudit = (
	options?: Parameters<typeof trpc.projects.deleteAudit.useMutation>[0],
) => {
	const utils = trpc.useUtils();
	return trpc.projects.deleteAudit.useMutation({
		mutationKey: ["deleteAudit"],
		...options,
		onSettled: (...args) => {
			options?.onSettled?.(...args);
			const data = args[0];
			utils.projects.findAll.invalidate();
			utils.projects.findById.invalidate({ id: data?.project?.id });
		},
	});
};
