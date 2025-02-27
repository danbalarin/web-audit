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
