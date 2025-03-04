export enum Arbitrary {
	PERCENTAGE,
	NUMBER,
	STRING,
}

export const arbitraryUnit = (unit: Arbitrary) => {
	switch (unit) {
		case Arbitrary.PERCENTAGE:
			return "%";
		case Arbitrary.NUMBER:
			return "";
	}
};
