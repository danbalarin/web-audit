import { useCallback, useEffect, useRef, useState } from "react";
import { trpc } from "~/server/query/client";

type AuditStatus = {
	id: string;
	progress: number;
};

type OnProgress = (progress: number, id: string) => void;
type OnDone = () => void;
type OnError = (error: unknown) => void;

type RunUrlOptions = {
	url: string;
	projectId: string;
	onProgress: OnProgress;
	onDone: OnDone;
	onError: OnError;
};

type RunOptions = {
	urls: string[];
	projectId: string;
};

// TODO use RxJS
const useProcessUrl = () => {
	const [id, setId] = useState<string | null>(null);
	const progressRef = useRef<OnProgress>();
	const doneRef = useRef<OnDone>();
	const errorRef = useRef<OnError>();
	const { data, error } = trpc.modules.jobStatus.useQuery(
		{ id: id ?? "" },
		{
			enabled: !!id,
			refetchInterval: () => {
				if (!id || data?.progress === 1) {
					return false;
				}
				return 1000;
			},
		},
	);
	const { mutateAsync } = trpc.modules.processUrl.useMutation();

	const runUrl = useCallback(
		async ({ url, projectId, onDone, onProgress, onError }: RunUrlOptions) => {
			const id = await mutateAsync({ url, projectId });
			progressRef.current = onProgress;
			doneRef.current = onDone;
			errorRef.current = onError;
			setId(id);
			return id;
		},
		[],
	);

	useEffect(() => {
		if (!id) {
			return;
		}
		if (progressRef.current && data?.progress) {
			progressRef.current(data.progress, id);
		}

		if (doneRef.current && data?.progress === 1) {
			doneRef.current();
		}
	}, [data]);

	useEffect(() => {
		if (errorRef.current && error) {
			errorRef.current(error);
		}
	}, [error]);

	return {
		runUrl,
	};
};

export const useProcessUrls = () => {
	const [isRunning, setIsRunning] = useState(false);
	const [auditsStatus, setAuditsStatus] = useState<Record<string, AuditStatus>>(
		{},
	);
	const runUrl = useProcessUrl();

	const createProgressHandler =
		(url: string) => (progress: number, id: string) => {
			setAuditsStatus((prev) => ({
				...prev,
				[url]: { id, progress },
			}));
		};

	const run = useCallback(async ({ urls, projectId }: RunOptions) => {
		const filteredUrls = urls.filter((url) => !!url);
		if (isRunning || filteredUrls.length === 0) {
			return;
		}
		setIsRunning(true);
		setAuditsStatus(
			Object.fromEntries(
				filteredUrls.map((url) => [url, { id: "", progress: 0 }]),
			),
		);

		for (const url of filteredUrls) {
			await new Promise<void>((resolve, reject) => {
				runUrl.runUrl({
					url,
					projectId,
					onProgress: createProgressHandler(url),
					onDone: resolve,
					onError: reject,
				});
			});

			setAuditsStatus((prev) => ({
				...prev,
				[url]: { id: prev[url]?.id ?? "", progress: 1 },
			}));
		}

		setIsRunning(false);
	}, []);

	const overallProgress =
		Object.values(auditsStatus).reduce((acc, curr) => acc + curr.progress, 0) /
		Object.keys(auditsStatus).length;

	return {
		run,
		isRunning,
		progress: overallProgress,
	};
};
