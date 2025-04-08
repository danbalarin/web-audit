type StandardEnum<T> = {
	[id: string]: T | string;
	[nu: number]: string;
};

export const createFlagMetric = <TEnum>(
	enumVal: StandardEnum<TEnum>,
	weights: Partial<{ [K in keyof StandardEnum<TEnum>]: number }>,
	fallbacks?: Partial<{
		[K in keyof StandardEnum<TEnum>]: keyof StandardEnum<TEnum>;
	}>,
	fallbackPenalty?: number,
) => {
	if (fallbacks && !fallbackPenalty) {
		throw new Error(
			"Fallbacks are provided but no fallback penalty is set. Please provide a fallback penalty.",
		);
	}

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
		const flags = getFlagsFromValue(+value);

		let actualScore = 0;

		Object.entries(weights).forEach(([flagStr, weight]) => {
			if (!weight) {
				return;
			}
			const flag = Number(flagStr) as TEnum;

			if (flags.includes(flag)) {
				actualScore += weight;
			} else if (
				fallbacks &&
				fallbackPenalty &&
				fallbacks[flag as keyof typeof fallbacks] &&
				flags.includes(fallbacks[flag as keyof typeof fallbacks] as TEnum)
			) {
				actualScore += weight * fallbackPenalty;
			}
		});

		return weightSum > 0 ? actualScore / weightSum : 0;
	};

	const compare = (a: number | string, b: number | string): number => {
		const scoreA = score(+a);
		const scoreB = score(+b);

		return scoreA < scoreB ? 1 : scoreA > scoreB ? -1 : 0;
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
