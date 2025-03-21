import type { BaseRunnerOptions, Logger } from "../types";
import type { BaseContext } from "../types/Context";
import type { MetricResult } from "../types/MetricResult";

export abstract class BaseRunner<
	TResult = unknown,
	TContext extends BaseContext = BaseContext,
	TOptions extends BaseRunnerOptions = BaseRunnerOptions,
> {
	public name: string;
	protected _logger: Logger | null = null;
	protected _options: Omit<TOptions, "logger">;

	constructor(name: string, { logger, ...options }: TOptions) {
		this.name = name;
		this._logger = logger.child({ runner: name });
		this._options = Object.assign({}, options);
	}

	abstract run(context: TContext): Promise<MetricResult[]>;

	protected abstract runRaw(context: TContext): Promise<TResult>;

	protected abstract transform(result: TResult): Promise<MetricResult[]>;
}
