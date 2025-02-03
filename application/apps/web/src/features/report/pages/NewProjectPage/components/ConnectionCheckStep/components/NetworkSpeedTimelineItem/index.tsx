import { CircularProgress, Stack, Typography } from "@mui/material";
import { UseSpeedTestStatus } from "~/features/report/hooks/useSpeedTest";

import { StatusTimelineItem } from "~/features/ui/components/StatusTimelineItem";

type Props = {
	status?: UseSpeedTestStatus;
};

export function NetworkSpeedTimelineItem({ status }: Props) {
	const timelineStatus =
		status === undefined ? "waiting" : status === "slow" ? "error" : "ok";

	return (
		<StatusTimelineItem status={timelineStatus}>
			<div>Speed check</div>
			<Stack ml={1.5} mt={1.5}>
				{status && <Typography>Speed: {status}</Typography>}
				{!status && <CircularProgress size="1.5rem" />}
			</Stack>
		</StatusTimelineItem>
	);
}
