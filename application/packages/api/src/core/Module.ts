import type { BaseContext, Logger, MetricResult } from "../types";
import { EventEmitter } from "../utils/EventEmitter";
import type { BaseRunner } from "./Runner";

export type ModuleOptions = {
	id: string;
	name: string;
	description: string;
	version: string;
	logger: Logger;
};

export type ModuleResult = {
	id: string;
	metrics: MetricResult[];
};

export type ModuleProgressEventPayload = {
	/**
	 * Progress percentage on a scale of 0 to 1
	 */
	progress: number;
};

export type ModuleProgressErrorEventPayload = {
	error: Error;
};

export type ModuleProgressCompleteEventPayload = {
	data: ModuleResult;
};

export type ModuleEvents = {
	progress: ModuleProgressEventPayload;
	error: ModuleProgressErrorEventPayload;
	complete: ModuleProgressCompleteEventPayload;
};

export abstract class BaseModule<
	TContext extends BaseContext = BaseContext,
> extends EventEmitter<ModuleEvents> {
	private _progress = 0;
	protected _runners: BaseRunner[] = [];
	protected _logger: Logger;
	protected readonly _options: Omit<ModuleOptions, "logger">;

	constructor(_options: ModuleOptions) {
		super();
		this._options = _options;
		this._logger = _options.logger;
	}

	protected async _execute(context: TContext): Promise<ModuleResult> {
		const metrics: MetricResult[] = [];
		const promises = this._runners.map(async (runner) => {
			if (!this._logger) {
				throw new Error("Logger not set");
			}
			this._logger.debug(`${runner.name}: running`);
			const res = await runner.run(context);
			this._logger.debug(`${runner.name}: finished`);
			metrics.push(...res);
			this.progress = this._progress + 1 / this._runners.length;
		});
		await Promise.all(promises);
		return {
			id: this.id,
			metrics,
		};
	}

	async execute(context: TContext) {
		this.logger.debug("executing");
		this.emit("progress", {
			progress: this._progress,
		});
		try {
			const result = await this._execute(context);
			this.logger.debug("complete");
			this.emit("complete", {
				data: result,
			});
			return result;
		} catch (error) {
			const sentError =
				error instanceof Error
					? error
					: new Error("Unknown error", { cause: error });
			this.logger.error({ error: sentError }, "error");
			this.emit("error", {
				error: sentError,
			});
			throw error;
		}
	}

	set progress(progress: number) {
		this._progress = progress;
		this.logger.debug({ progress }, "progress");
		this.emit("progress", {
			progress,
		});
	}

	set logger(logger: Logger) {
		this._logger = logger;
	}

	// GETTERS
	get id() {
		return this._options.id;
	}

	get name() {
		return this._options.name;
	}

	get description() {
		return this._options.description;
	}

	get version() {
		return this._options.version;
	}
}
