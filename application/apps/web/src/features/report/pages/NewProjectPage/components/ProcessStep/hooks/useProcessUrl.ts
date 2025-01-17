import { ModuleProcessorMeta } from "@repo/api";
import { useCallback, useEffect, useState } from "react";
import { trpc } from "~/server/query/client";

enum UrlStatus {
	waiting = "waiting",
	loading = "loading",
	ok = "ok",
	error = "error",
}

type UrlState = {
	status: keyof typeof UrlStatus;
	error?: string;
};

type UseProcessUrlProps = {
	url: string;
	onComplete: (data: ModuleProcessorMeta) => void;
};

export const useProcessUrl = ({ url, onComplete }: UseProcessUrlProps) => {
	const { mutateAsync } = trpc.modules.processUrl.useMutation();
	const [jobId, setJobId] = useState<string>("");
	const [state, setState] = useState<UrlState>({
		status: "waiting",
	});
	const { refetch, data } = trpc.modules.jobStatus.useQuery(
		{ id: jobId },
		{
			enabled: state.status === "loading",
			refetchInterval: state.status === "loading" ? 1000 : false,
		},
	);

	useEffect(() => {
		if (data?.ok && data.data.meta.progress === 1) {
			refetch({ cancelRefetch: true });
			setState({ status: "ok" });
			onComplete(data.data.meta);
		}
	}, [data]);

	const run = useCallback(async () => {
		if (state.status === "loading") {
			return;
		}
		setState({ status: "loading" });

		try {
			const { id } = await mutateAsync({ url });
			setJobId(id);
			await refetch();
			// biome-ignore lint/suspicious/noExplicitAny: error handling
		} catch (error: any) {
			setState({
				status: "error",
				error: error?.message || "Unknown error",
			});
		}
	}, [url]);

	return {
		run,
		state,
		data,
	};
};
