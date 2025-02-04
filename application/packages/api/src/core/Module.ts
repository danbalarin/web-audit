import type { AuditCategoryResult } from "../types/AuditResult";
import { BaseContext } from "../types/Context";
import { EventEmitter } from "../utils/EventEmitter";

export type ModuleOptions = {
	id: string;
	name: string;
	description: string;
	version: string;
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
	data: AuditCategoryResult;
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

	constructor(private readonly _options: ModuleOptions) {
		super();
	}

	protected abstract _execute(context: TContext): Promise<AuditCategoryResult>;

	async execute(context: TContext) {
		this.emit("progress", {
			progress: this._progress,
		});
		try {
			const result = await this._execute(context);
			this.emit("complete", {
				data: result,
			});
			return result;
		} catch (error) {
			const sentError =
				error instanceof Error
					? error
					: new Error("Unknown error", { cause: error });
			this.emit("error", {
				error: sentError,
			});
			throw error;
		}
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
