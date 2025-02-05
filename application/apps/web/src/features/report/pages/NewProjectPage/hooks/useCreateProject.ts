import { trpc } from "~/server/query/client";

export const useCreateProject = (
	options?: Parameters<typeof trpc.projects.create.useMutation>[0],
) => {
	const utils = trpc.useUtils();
	return trpc.projects.create.useMutation({
		mutationKey: ["createProject"],
		...options,
		onMutate: async (...args) => {
			await options?.onMutate?.(...args);

			const input = args[0];
			utils.projects.findAll.cancel();

			const previousProjects = utils.projects.findAll.getData();

			utils.projects.findAll.setData(undefined, (oldQueryData) => [
				...(oldQueryData ?? []),
				{
					id: "new",
					createdAt: new Date(),
					updatedAt: new Date(),
					...input,
				},
			]);

			return { previousProjects };
		},
		onError: (...args) => {
			options?.onError?.(...args);
			const context = args[2];
			utils.projects.findAll.setData(undefined, context?.previousProjects);
		},
		onSettled: (...args) => {
			options?.onSettled?.(...args);
			utils.projects.findAll.invalidate();
		},
	});
};
