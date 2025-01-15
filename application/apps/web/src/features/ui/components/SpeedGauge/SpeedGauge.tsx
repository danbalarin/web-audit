import { memo } from "react";
import GaugeChart from "react-gauge-chart";

type Props = {
	speed: number;
	maxSpeed: number;
	tooltipText?: string;
	color?: string;
	icon?: React.ReactNode;
};

function NonMemoizedSpeedGauge({ speed, maxSpeed }: Props) {
	const gaugeLevel = Math.min(speed / maxSpeed, 1);

	return (
		<GaugeChart
			colors={["#06B9FE", "#7BFF76"]}
			nrOfLevels={20}
			arcPadding={0.03}
			percent={gaugeLevel}
			animate={false}
			hideText
			marginInPercent={0.01}
		/>
	);
}

export const SpeedGauge = memo(
	NonMemoizedSpeedGauge,
	(prevProps, nextProps) =>
		prevProps.speed === nextProps.speed &&
		prevProps.maxSpeed === nextProps.maxSpeed,
);
