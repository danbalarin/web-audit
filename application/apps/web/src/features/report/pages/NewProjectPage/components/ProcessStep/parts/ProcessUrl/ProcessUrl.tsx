import {
	Alert,
	AlertTitle,
	Button,
	LinearProgress,
	Stack,
} from "@mui/material";
import { StatusTimelineItem } from "~/features/ui/components/StatusTimelineItem";
import { useProcessUrl } from "../../hooks/useProcessUrl";

type ProcessUrlProps = {
	url: string;
};

export const ProcessUrl = ({ url }: ProcessUrlProps) => {
	const onComplete = console.log;
	const { data, run, state } = useProcessUrl({ url, onComplete });

	return (
		<StatusTimelineItem key={url} status={state.status}>
			<Stack gap={2}>
				{url}
				<Button
					variant="outlined"
					onClick={run}
					sx={{ alignSelf: "flex-start" }}
				>
					Run
				</Button>
				{state.status === "loading" && (
					<LinearProgress
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
