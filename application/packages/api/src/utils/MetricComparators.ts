export const createMetricCompareLowerIsBetter =
	(delta?: number) => (oldVal: number, newVal: number) => {
		if (Math.abs(oldVal - newVal) < (delta || 0)) {
			return 0;
		}
		return oldVal > newVal ? 1 : oldVal < newVal ? -1 : 0;
	};

export const createMetricCompareHigherIsBetter =
	(delta?: number) => (oldVal: number, newVal: number) => {
		if (Math.abs(oldVal - newVal) < (delta || 0)) {
			return 0;
		}
		return oldVal < newVal ? 1 : oldVal > newVal ? -1 : 0;
	};
