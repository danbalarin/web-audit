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
	return convertMemory(memory / 1024, Object.values(Memory)[nextUnit + 1]);
};
