import { AxeResult } from "~/types/AxeResult";

export const axeComparator = (a: AxeResult, b: AxeResult) => {
	return a - b;
};
