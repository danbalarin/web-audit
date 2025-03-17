export enum Arbitrary {
	PERCENTAGE,
	NUMBER,
	STRING,
	BOOLEAN, // True is success, false is fail
}

export const arbitraryUnit = (unit: Arbitrary) => {
	switch (unit) {
		case Arbitrary.PERCENTAGE:
			return "%";
		case Arbitrary.NUMBER:
			return "";
	}
};
