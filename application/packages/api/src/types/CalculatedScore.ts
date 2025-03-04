export type CalculatedScore<T> = T & {
	score: string | number;
	rank: "fail" | "average" | "good";
};
