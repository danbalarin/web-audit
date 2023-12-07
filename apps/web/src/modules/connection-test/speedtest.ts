import { Fast, Unit } from "./services/Fast";

export type CheckSpeedOptions = {
  onUpdate?: (options: { speed: number; requestIndex: number }) => void;
  onComplete?: (options: { speed: number }) => void;
};

export const checkSpeed = ({ onUpdate, onComplete }: CheckSpeedOptions) => {
  const controller = new AbortController();
  const speedtest = new Fast({
    onChange: onUpdate,
    onComplete,
    count: 3, // TODO: make this configurable
  });
  speedtest.getSpeed(controller.signal);

  return controller;
};
