import { BaseRunner } from "@repo/api";
import type {
	BaseContext,
	BaseRunnerOptions,
	MetricResult,
} from "@repo/api/types";

import { EMPTY_INPUT } from "@repo/api/metrics";
import { ImmediateFeedback } from "./metrics/immediate-feedback";

export type UserInterfaceHeuristicsRunnerOptions = BaseRunnerOptions;

type Result = null;

export class UserInterfaceHeuristicsRunner extends BaseRunner<
	Result,
	BaseContext,
	UserInterfaceHeuristicsRunnerOptions
> {
	constructor(options: UserInterfaceHeuristicsRunnerOptions) {
		super("UserInterfaceHeuristicsRunner", options);
	}

	async transform(_res: Result): Promise<MetricResult[]> {
		return [
			{
				id: ImmediateFeedback.id,
				value: EMPTY_INPUT,
			},
		];
	}

	async runRaw(_context: BaseContext): Promise<Result> {
		return null;
	}
}
