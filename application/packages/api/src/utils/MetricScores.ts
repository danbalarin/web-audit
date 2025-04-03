type Range = {
	min: number;
	max: number;
};

const DEFAULT_RANGE: Range = {
	min: 0,
	max: 100,
};

export const createScoreNumber =
	(range?: Partial<Range>) =>
	(val: number | string): number => {
		const parsedVal = Number(val);
		const rangesToUse = { ...DEFAULT_RANGE, ...range };
		if (parsedVal < rangesToUse.min) {
			return 0;
		} else if (parsedVal > rangesToUse.max) {
			return 100;
		}
		return (
			((parsedVal - rangesToUse.min) / (rangesToUse.max - rangesToUse.min)) *
			100
		);
	};

export const scoreBoolean = (val: number | string): number =>
	+val === 1 ? 100 : 0;

export const scoreInformational = (_val: number | string): number => 100;
