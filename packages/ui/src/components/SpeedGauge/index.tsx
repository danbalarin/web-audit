import { Box, BoxProps, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useMemo } from "react";
import GaugeChart from "react-gauge-chart";

type Props = Omit<BoxProps, "color"> & {
  speed: number;
  maxSpeed: number;
  tooltipText?: string;
  color?: string;
  icon?: React.ReactNode;
};

export function SpeedGauge({
  speed,
  maxSpeed,
  tooltipText,
  color,
  icon,
  ...props
}: Props) {
  const gaugeLevel = Math.min(speed / maxSpeed, 1);

  const gauge = useMemo(
    () => (
      <GaugeChart
        colors={["#06B9FE", "#7BFF76"]}
        nrOfLevels={20}
        arcPadding={0.03}
        percent={gaugeLevel}
        animate={false}
        hideText
        marginInPercent={0.01}
      />
    ),
    [gaugeLevel]
  );

  return (
    <Box position="relative" {...props}>
      {gauge}
      <Tooltip title={tooltipText} placement="top">
        <Typography
          position="absolute"
          top="50%"
          left="50%"
          fontSize="2rem"
          sx={{ transform: "translate(-50%, -50%)", "& > svg": { mr: 1 } }}
          component={motion.span}
          transition={{ delay: 0.5 }}
          animate={{ color }}
        >
          {icon}
          {speed.toFixed(1)} MBps
        </Typography>
      </Tooltip>
    </Box>
  );
}
