import {
	Alert,
	AlertTitle,
	Box,
	Button,
	LinearProgress,
	Stack,
	Tooltip,
} from "@mui/material";
import { ModuleProcessorState } from "@repo/api";
import { useEffect } from "react";
import { useAuditState } from "~/features/report/states/auditState";
import { StatusTimelineItem } from "~/features/ui/components/StatusTimelineItem";
import { useProcessUrl } from "../../hooks/useProcessUrl";

type ProcessUrlProps = {
	url: string;
	onStart?: () => void;
	onComplete?: () => void;
	disabled?: boolean;
};

export const ProcessUrl = ({
	url,
	onComplete,
	onStart,
	disabled,
}: ProcessUrlProps) => {
	const handleCompletion = (data: ModuleProcessorState) => {
		useAuditState
			.getState()
			.addUrlData(url, { jobId: data.id, data: data.modules });
		onComplete?.();
	};
	const { data, run, state } = useProcessUrl({
		url,
		onComplete: handleCompletion,
	});

	useEffect(() => {
		if (state.status === "ok" || state.status === "error") {
			onComplete?.();
		} else if (state.status === "loading") {
			onStart?.();
		}
	}, [state.status]);

	return (
		<StatusTimelineItem key={url} status={state.status}>
			<Stack gap={2}>
				{url}
				<Tooltip
					title={
						disabled ? "Please wait for the current process to complete" : ""
					}
				>
					<Box component="span" sx={{ display: "flex" }}>
						<Button
							variant="outlined"
							onClick={run}
							sx={{ alignSelf: "flex-start" }}
							disabled={disabled}
						>
							Run
						</Button>
					</Box>
				</Tooltip>
				{state.status === "loading" && (
					<LinearProgress
						value={100}
						variant={
							data?.ok && data.data.meta.progress === 1
								? "determinate"
								: "query"
						}
					/>
				)}
				{state.error && (
					<Alert severity="error" variant="outlined">
						<AlertTitle>Alert</AlertTitle>
						{state.error}
					</Alert>
				)}
			</Stack>
		</StatusTimelineItem>
	);
};

ProcessUrl.displayName = "ProcessUrl";
