import { BaseContext } from "../types/Context";
import type { MetricResult } from "../types/MetricResult";

export abstract class BaseRunner<
	TResult = unknown,
	TContext extends BaseContext = BaseContext,
> {
	public name: string;

	constructor(name: string) {
		this.name = name;
	}

	abstract run(context: TContext): Promise<MetricResult[]>;

	protected abstract runRaw(context: TContext): Promise<TResult>;

	abstract transform(result: TResult): Promise<MetricResult[]>;
}
