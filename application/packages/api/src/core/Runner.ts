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
		this._logger = logger.child({ runner: name }, { msgPrefix: `[${name}] ` });
		this._options = Object.assign({}, options);
	}

	async run(context: TContext): Promise<MetricResult[]> {
		const start = Date.now();
		const data = await this.runRaw(context);
		const runEnd = Date.now();
		const runDuration = runEnd - start;
		this._logger?.info(`run finished in ${runDuration}ms`);

		const transformedData = this.transform(data);
		const transformEnd = Date.now();
		const transformDuration = transformEnd - runEnd;
		this._logger?.info(`transform finished in ${transformDuration}ms`);
		return transformedData;
	}

	protected abstract runRaw(context: TContext): Promise<TResult>;

	protected abstract transform(result: TResult): Promise<MetricResult[]>;
}
