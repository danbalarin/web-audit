export const createMetricCompareLowerIsBetter =
	(delta?: number) => (a: number, b: number) => {
		if (Math.abs(a - b) < (delta || 0)) {
			return 0;
		}
		return a < b ? 1 : a > b ? -1 : 0;
	};

export const createMetricCompareHigherIsBetter =
	(delta?: number) => (a: number, b: number) => {
		if (Math.abs(a - b) < (delta || 0)) {
			return 0;
		}
		return a < b ? -1 : a > b ? 1 : 0;
	};
