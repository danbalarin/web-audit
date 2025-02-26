import { BaseContext } from "../types/Context";
import type { MetricResult } from "../types/MetricResult";

export abstract class BaseRunner<
	TResult = unknown,
	TContext extends BaseContext = BaseContext,
> {
	abstract run(context: TContext): Promise<MetricResult[]>;

	abstract runRaw(context: TContext): Promise<TResult>;

	abstract transform(result: TResult): Promise<MetricResult[]>;
}
