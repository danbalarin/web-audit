import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { checkSpeed } from "~/features/connection-test";

export type UseSpeedTestStatus = "fast" | "medium" | "slow";

export type UseSpeedTestCompleteResult = {
  speed: number;
  status: UseSpeedTestStatus;
};

export type UseSpeedTestOptions = {
  thresholds?: [number, number]; // <slow, medium, fast>
  onComplete?: (result: UseSpeedTestCompleteResult) => void;
};

export type UseSpeedTestResult = {
  isCompleted: boolean;
  speed: number;
  status: UseSpeedTestStatus;
  run: () => Promise<UseSpeedTestCompleteResult>;
};

const getStatus = (
  speed: number,
  thresholds: NonNullable<UseSpeedTestOptions["thresholds"]>,
) => {
  if (speed > thresholds[1]) {
    return "fast";
  }

  if (speed > thresholds[0]) {
    return "medium";
  }

  return "slow";
};

const DEFAULT_THRESHOLDS: NonNullable<UseSpeedTestOptions["thresholds"]> = [
  5, 8,
];

const DEBOUNCE_DIFFERENCE = 0.1;

export const useSpeedTest = ({
  thresholds = DEFAULT_THRESHOLDS,
  onComplete,
}: UseSpeedTestOptions): UseSpeedTestResult => {
  const controllerRef = useRef<AbortController | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [debouncedSpeed, setDebouncedSpeed] = useState(0);

  const onConnectionUpdate = useCallback(
    ({ speed }: { speed: number }) => {
      if (setSpeed) {
        setSpeed(speed);
      }
    },
    [setSpeed],
  );

  const onConnectionComplete = useCallback(
    ({ speed }: { speed: number }) => {
      setIsCompleted(true);
      const status = getStatus(speed, thresholds);
      onComplete?.({ speed, status });
    },
    [onComplete, thresholds],
  );

  const run = useCallback(
    () =>
      new Promise<UseSpeedTestCompleteResult>((res, rej) => {
        try {
          if (controllerRef.current) {
            controllerRef.current.abort();
          }
        } catch (error) {
          void 0;
        }

        const onCompletePromise = ({ speed }: { speed: number }) => {
          const status = getStatus(speed, thresholds);
          if (status === "slow") {
            rej({ speed, status });
          } else {
            res({ speed, status });
          }
        };

        controllerRef.current = checkSpeed({
          onUpdate: onConnectionUpdate,
          onComplete: (props) => {
            onConnectionComplete(props);
            onCompletePromise(props);
          },
        });
      }),
    [onConnectionUpdate, onConnectionComplete, thresholds],
  );

  useEffect(() => {
    return () => {
      try {
        if (controllerRef.current) {
          controllerRef.current.abort("cleanup");
        }
      } catch (e) {
        void 0;
      }
    };
  }, []);

  useEffect(() => {
    if (Math.abs(speed - debouncedSpeed) > DEBOUNCE_DIFFERENCE) {
      setDebouncedSpeed(speed);
    }
  }, [speed, setDebouncedSpeed]);

  const status = useMemo(
    () => getStatus(debouncedSpeed, thresholds),
    [debouncedSpeed, thresholds],
  );

  return {
    isCompleted,
    speed: debouncedSpeed,
    status,
    run,
  };
};
