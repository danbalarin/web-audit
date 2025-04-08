type StandardEnum<T> = {
	[id: string]: T | string;
	[nu: number]: string;
};

export const createFlagMetric = <TEnum>(
	enumVal: StandardEnum<TEnum>,
	weights: Partial<{ [K in keyof StandardEnum<TEnum>]: number }>,
) => {
	const getFlagsFromValue = (value: number): TEnum[] => {
		const flags: TEnum[] = [];

		Object.values(enumVal as object).forEach((flag) => {
			if (typeof flag !== "string" && value & flag) {
				flags.push(flag);
			}
		});

		return flags;
	};

	const getValueFromFlags = (flags: TEnum[]): number => {
		let value = 0;

		for (const flag of flags) {
			value |= +flag;
		}

		return value;
	};

	const getMissingTags = (value: number): TEnum[] => {
		const flags = getFlagsFromValue(+value);
		const missingFlags = Object.values(enumVal as object).filter(
			(flag) => typeof flag !== "string" && !flags.includes(flag),
		) as TEnum[];

		return missingFlags;
	};

	const weightSum = Object.values<number>(
		weights as Record<string, number>,
	).reduce((acc, weight) => acc + weight, 0);

	const score = (value: number | string): number => {
		const flags = getMissingTags(+value);
		const total = flags.reduce(
			(acc, flag) => acc + (weights[flag as string | number] ?? 0),
			0,
		);
		console.log(total, weightSum);
		return total / weightSum;
	};

	const compare = (a: number | string, b: number | string): number => {
		const scoreA = score(+a);
		const scoreB = score(+b);

		return scoreA - scoreB;
	};

	return {
		getMissingTags,
		compare,
		score,
		weights,
		weightSum,
		getValueFromFlags,
		getFlagsFromValue,
	};
};
