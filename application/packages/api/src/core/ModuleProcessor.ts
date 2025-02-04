import { v4 as uuid } from "uuid";

import type { AuditResult } from "../types/AuditResult";
import type { BaseContext } from "../types/Context";
import type { DeepPartial } from "../types/DeepPartial";
import { Logger } from "../types/Logger";
import type { BaseModule } from "./Module";
import type { BaseStorage } from "./Storage";

type Step = "ready" | "processing" | "done";

export type ModuleProcessorMeta = {
	step: Step;
	progress: number;
};

export type ModuleProcessorState = {
	id: string;
	meta: ModuleProcessorMeta;
	result: AuditResult;
};

export type ModuleProcessorOptions<
	TModuleProcessorState extends ModuleProcessorState = ModuleProcessorState,
> = {
	storage: BaseStorage<TModuleProcessorState>;
	modules: BaseModule[];
	logger: Logger;
};

export class ModuleProcessor {
	private _storage: BaseStorage<ModuleProcessorState>;
	private _currentStep: Step = "ready";
	private _modules: BaseModule[] = [];
	private _logger: Logger;
	private readonly _id = uuid();

	constructor(private _options: ModuleProcessorOptions) {
		this._storage = _options.storage;
		this._modules = _options.modules;
		this._logger = _options.logger;
	}

	public process<TContext extends BaseContext = BaseContext>(
		context: TContext,
	) {
		if (this._currentStep !== "ready") {
			throw new Error("Processor is already running");
		}
		this.processAsync(context);
		return this._id;
	}

	private async saveState(data: DeepPartial<ModuleProcessorState>) {
		await this._storage.append(this._id, { id: this._id, ...data });
	}

	private async progress(progress: number) {
		await this.saveState({
			meta: {
				step: this._currentStep,
				progress,
			},
		});
	}

	private async processAsync<TContext extends BaseContext = BaseContext>(
		context: TContext,
	): Promise<AuditResult> {
		this._logger.trace("processing modules");
		this._currentStep = "processing";

		await this.progress(0);

		const result: AuditResult = {
			categories: [],
			runId: this._id,
			url: context.url,
		};
		let completed = 0;
		const promises = [];
		for (const module of Object.values(this._modules)) {
			const moduleLogger = this._logger.child({
				moduleId: module.id,
			});
			module.on("progress", (payload) => {
				moduleLogger.trace({ progress: payload.progress }, "progress");
				this.progress(
					completed / this._modules.length +
						payload.progress / this._modules.length,
				);
			});

			module.on("error", (payload) => {
				moduleLogger.error({ error: payload.error }, "error");
			});

			module.on("complete", (payload) => {
				moduleLogger.trace("complete");
				completed++;
				this.progress(completed / this._modules.length);
				result.categories.push(payload.data);
			});

			promises.push(module.execute(context));
		}

		await Promise.all(promises);

		this._currentStep = "done";

		this.saveState({
			result,
			meta: {
				progress: 1,
				step: this._currentStep,
			},
		});

		return result;
	}
}
