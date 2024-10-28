import { BoxProps } from "@mui/material";

import { SpeedGauge } from "~/features/ui/components/SpeedGauge";

import { UseSpeedTestStatus } from "../../hooks/useSpeedTest";

import { MESSAGE_CONFIGS } from "./constants";

type Props = Omit<BoxProps, "color"> & {
  speed: number;
  maxSpeed: number;
  status?: UseSpeedTestStatus;
  color?: string;
};

export function NetworkSpeedGauge({ status, ...props }: Props) {
  return <SpeedGauge {...MESSAGE_CONFIGS[status ?? "waiting"]} {...props} />;
}
