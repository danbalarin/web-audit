import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { useTheme } from "@mui/material";
import { useMemo } from "react";

import { UseSpeedTestStatus } from "~/features/report/hooks/useSpeedTest";

import { NetworkSpeedGauge } from "../../../NetworkSpeedGauge";

type Props = {
  maxSpeed: number;
  speed: number;
  status?: UseSpeedTestStatus;
};

export function NetworkSpeedTimelineItem({ maxSpeed, speed, status }: Props) {
  const { palette } = useTheme();
  const color = useMemo(() => {
    switch (status) {
      case "fast":
        return palette.success.main;
      case "medium":
        return palette.warning.main;
      case "slow":
        return palette.error.main;
      default:
        return palette.text.primary;
    }
  }, [palette, status]);

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot sx={{ backgroundColor: color }} />
        <TimelineConnector sx={{ backgroundColor: color }} />
      </TimelineSeparator>
      <TimelineContent>
        Speed check
        <NetworkSpeedGauge
          maxWidth="24rem"
          marginBottom={-1}
          maxSpeed={maxSpeed}
          speed={speed}
          status={status}
          color={color}
        />
      </TimelineContent>
    </TimelineItem>
  );
}
