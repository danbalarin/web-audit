import type { MetricResult } from "../types/AuditResult";
import { BaseContext } from "../types/Context";

export abstract class BaseRunner<
	TResult = unknown,
	TContext extends BaseContext = BaseContext,
> {
	abstract run(context: TContext): Promise<MetricResult[]>;

	abstract runRaw(context: TContext): Promise<TResult>;

	abstract transform(result: TResult): Promise<MetricResult[]>;
}
