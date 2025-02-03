import { Fast } from "./services/Fast";

export type CheckSpeedOptions = {
	onUpdate?: (options: { speed: number; requestIndex: number }) => void;
	onComplete?: (options: { speed: number }) => void;
	/**
	 * Minimum speed in MBps
	 */
	minSpeed?: number;
};

export const checkSpeed = ({
	onUpdate,
	onComplete,
	minSpeed,
}: CheckSpeedOptions) => {
	const controller = new AbortController();
	const speedtest = new Fast({
		onChange: onUpdate,
		onComplete,
		count: 3, // TODO: make this configurable
		minSpeed,
	});
	speedtest.getSpeed(controller.signal).catch((e) => {
		if (e.name === "AbortError") {
			onComplete?.({ speed: 0 });
		} else {
			throw e;
		}
	});

	return controller;
};
