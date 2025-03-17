export const compareBoolean = (
	oldVal: number | string,
	newVal: number | string,
) => {
	const castedOldVal = +oldVal;
	const castedNewVal = +newVal;
	return castedNewVal - castedOldVal;
};

/**
 * Compare two values that are informational, meaning they don't have a clear "better" or "worse" value.
 */
export const compareInformational = (
	_oldVal: number | string,
	_newVal: number | string,
) => {
	return 0;
};

export const createMetricCompareLowerIsBetter =
	(delta?: number) => (oldVal: number | string, newVal: number | string) => {
		const castedOldVal = +oldVal;
		const castedNewVal = +newVal;
		if (Math.abs(castedOldVal - castedNewVal) < (delta || 0)) {
			return 0;
		}
		return castedOldVal > castedNewVal
			? 1
			: castedOldVal < castedNewVal
				? -1
				: 0;
	};

export const createMetricCompareHigherIsBetter =
	(delta?: number) => (oldVal: number | string, newVal: number | string) => {
		const castedOldVal = +oldVal;
		const castedNewVal = +newVal;
		if (Math.abs(castedOldVal - castedNewVal) < (delta || 0)) {
			return 0;
		}
		return castedOldVal < castedNewVal
			? 1
			: castedOldVal > castedNewVal
				? -1
				: 0;
	};
