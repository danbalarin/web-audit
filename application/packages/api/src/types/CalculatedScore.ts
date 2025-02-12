export type CalculatedScore<T> = T & {
	score: number;

	rank: "fail" | "average" | "good";
};
