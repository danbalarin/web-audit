import { SpeedGauge } from "~/features/ui/components/SpeedGauge";

import type { UseSpeedTestStatus } from "../../hooks/useSpeedTest";

import { MESSAGE_CONFIGS } from "./constants";

type Props = {
	speed: number;
	maxSpeed: number;
	status?: UseSpeedTestStatus;
	color?: string;
};

export function NetworkSpeedGauge({ status, ...props }: Props) {
	return <SpeedGauge {...MESSAGE_CONFIGS[status ?? "waiting"]} {...props} />;
}
