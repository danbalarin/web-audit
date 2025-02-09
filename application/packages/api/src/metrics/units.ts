export enum Time {
	MILLISECOND = "ms",
	SECOND = "s",
	MINUTE = "m",
}

export const convertTime = (
	time: number,
	unit: Time = Time.MILLISECOND,
): { time: number; unit: Time } => {
	if (unit === Time.MILLISECOND && time > 1000) {
		return convertTime(time / 1000, Time.SECOND);
	}
	if (unit === Time.SECOND && time > 60) {
		return convertTime(time / 60, Time.MINUTE);
	}
	return { time, unit };
};

export enum Memory {
	BYTE = "B",
	KILOBYTE = "KB",
	MEGABYTE = "MB",
	GIGABYTE = "GB",
}

export const convertMemory = (
	memory: number,
	unit: Memory = Memory.BYTE,
): { memory: number; unit: Memory } => {
	const nextUnit = Object.values(Memory).findIndex((u) => u === unit);
	if (nextUnit === -1 || memory < 1024) {
		return { memory, unit };
	}
	return convertMemory(memory / 1024, Object.values(Memory)[nextUnit]);
};
