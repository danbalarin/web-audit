// import { ModuleProcessorState } from "@repo/api";
// import { useCallback, useEffect, useState } from "react";
// import { reactLogger } from "~/lib/logger";
// import { trpc } from "~/server/query/client";

// enum UrlStatus {
// 	waiting = "waiting",
// 	loading = "loading",
// 	ok = "ok",
// 	error = "error",
// }

// type UrlState = {
// 	status: keyof typeof UrlStatus;
// 	error?: string;
// };

// type UseProcessUrlProps = {
// 	url: string;
// 	onComplete: (data: ModuleProcessorState) => void;
// };

// export const useProcessUrl = ({ url, onComplete }: UseProcessUrlProps) => {
// 	const { mutateAsync } = trpc.modules.processUrl.useMutation();
// 	const [jobId, setJobId] = useState<string>("");
// 	const [state, setState] = useState<UrlState>({
// 		status: "waiting",
// 	});
// 	const { refetch: statusRefetch, data: statusData } =
// 		trpc.modules.jobStatus.useQuery(
// 			{ id: jobId },
// 			{
// 				enabled: state.status === "loading",
// 				refetchInterval: state.status === "loading" ? 1000 : false,
// 			},
// 		);
// 	const { refetch } = trpc.modules.jobResult.useQuery(
// 		{ id: jobId },
// 		{ enabled: false },
// 	);

// 	useEffect(() => {
// 		(async () => {
// 			if (statusData?.ok && statusData.data.meta.progress === 1) {
// 				statusRefetch({ cancelRefetch: true });
// 				const resultData = await refetch();
// 				if (!resultData.data?.ok) {
// 					reactLogger.error("Error fetching job result", resultData.error);
// 					setState({
// 						status: "error",
// 						error: resultData.error?.message || "Unknown error",
// 					});
// 					return;
// 				}
// 				setState({ status: "ok" });
// 				onComplete({
// 					id: jobId,
// 					meta: statusData.data.meta,
// 					result: resultData.data.data,
// 				});
// 			}
// 		})();
// 	}, [statusData]);

// 	const run = useCallback(async () => {
// 		if (state.status === "loading") {
// 			return;
// 		}
// 		setState({ status: "loading" });

// 		try {
// 			const { id } = await mutateAsync({ url });
// 			setJobId(id);
// 			await statusRefetch();
// 			// biome-ignore lint/suspicious/noExplicitAny: error handling
// 		} catch (error: any) {
// 			setState({
// 				status: "error",
// 				error: error?.message || "Unknown error",
// 			});
// 		}
// 	}, [url]);

// 	return {
// 		run,
// 		state,
// 		data: statusData,
// 	};
// };
