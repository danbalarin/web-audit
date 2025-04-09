export type ScoreResult = {
	value: string | number;

	status: "not-scored" | "scored" | "incomplete";
};
