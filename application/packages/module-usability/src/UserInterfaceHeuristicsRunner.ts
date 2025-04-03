import { BaseRunner } from "@repo/api";
import type {
	BaseContext,
	BaseRunnerOptions,
	MetricResult,
} from "@repo/api/types";

import { EMPTY_INPUT } from "@repo/api/metrics";
import { ActionConsistency } from "./metrics/action-consistency";
import { Aesthetics } from "./metrics/aesthetics";
import { BrandCompliance } from "./metrics/brand-compliance";
import { ClearFeedback } from "./metrics/clear-feedback";
import { ContextualCues } from "./metrics/contextual-cues";
import { FlexibleNavigation } from "./metrics/flexible-navigation";
import { IconMetaphors } from "./metrics/icon-metaphors";
import { ImmediateFeedback } from "./metrics/immediate-feedback";
import { VisualConsistency } from "./metrics/visual-consistency";

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
				id: ActionConsistency.id,
				value: EMPTY_INPUT,
			},
			{
				id: Aesthetics.id,
				value: EMPTY_INPUT,
			},
			{
				id: BrandCompliance.id,
				value: EMPTY_INPUT,
			},
			{
				id: ClearFeedback.id,
				value: EMPTY_INPUT,
			},
			{
				id: ContextualCues.id,
				value: EMPTY_INPUT,
			},
			{
				id: FlexibleNavigation.id,
				value: EMPTY_INPUT,
			},
			{
				id: IconMetaphors.id,
				value: EMPTY_INPUT,
			},
			{
				id: ImmediateFeedback.id,
				value: EMPTY_INPUT,
			},
			{
				id: VisualConsistency.id,
				value: EMPTY_INPUT,
			},
		];
	}

	async runRaw(_context: BaseContext): Promise<Result> {
		return null;
	}
}
