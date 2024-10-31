import { CircularProgress, Fade, Stack, Typography } from "@mui/material";

import { UseSpeedTestStatus } from "~/features/report/hooks/useSpeedTest";
import { StatusTimelineItem } from "~/features/ui/components/StatusTimelineItem";

type Props = {
  maxSpeed: number;
  speed: number;
  status?: UseSpeedTestStatus;
};

const STATUS_MAP = {
  fast: "ok",
  medium: "ok",
  slow: "error",
} as const;

export function NetworkSpeedTimelineItem({ status }: Props) {
  return (
    <StatusTimelineItem status={status ? STATUS_MAP[status] : "waiting"}>
      <div>Speed check</div>
      <Stack ml={1.5} mt={1.5}>
        {status && <Typography>Speed: {status}</Typography>}
        {!status && <CircularProgress />}
      </Stack>

      {/* <NetworkSpeedGauge maxSpeed={maxSpeed} speed={speed} /> */}
    </StatusTimelineItem>
  );
}
