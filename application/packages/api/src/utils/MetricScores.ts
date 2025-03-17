export const scoreBoolean = (val: number | string): number =>
	+val === 0 ? 100 : 0;

export const scoreInformational = (_val: number | string): number => 100;
