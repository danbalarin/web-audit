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
