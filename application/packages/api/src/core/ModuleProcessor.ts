import { v4 as uuid } from "uuid";

import type { DeepPartial } from "~/types/DeepPartial";
import { Logger } from "~/types/Logger";
import type { BaseContext } from "./Context";
import type { BaseModule } from "./Module";
import type { BaseStorage } from "./Storage";

type Step = "ready" | "gatherers" | "dataPreprocessing" | "audits" | "done";

type GatherersStatus = "complete" | "inProgress" | "waiting";

export type ModuleProcessorMeta = {
	step: Step;
	gatherersStatus: Record<string, GatherersStatus>;
	progress: number;
};

type ModuleData = {
	gatherers: Record<string, unknown>;
};

export type ModuleProcessorState = {
	id: string;
	meta: ModuleProcessorMeta;
	modules: Record<string, ModuleData>;
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

	private async processAsync<TContext extends BaseContext = BaseContext>(
		context: TContext,
	) {
		const gatherersData = await this.processGatherers(context);

		this.saveState({ modules: { gatherers: gatherersData } });

		return gatherersData;
		// TODO: data preprocessing
	}

	private async processGatherers<TContext extends BaseContext = BaseContext>(
		context: TContext,
	) {
		this._logger.trace("processing gatherers");
		this._currentStep = "gatherers";

		const data = {} as Record<string, unknown>;
		await this.initGatherersMeta();
		const promises = [];

		for (const module of Object.values(this._modules)) {
			const gathererLogger = this._logger.child({
				moduleId: module.id,
			});
			module.on("gatherer:start", (payload) => {
				gathererLogger.trace({ gathererId: payload.gathererId }, "start");
				this.reportProgress(payload.gathererId, "inProgress");
			});

			module.on("gatherer:complete", (payload) => {
				gathererLogger.trace({ gathererId: payload.gathererId }, "complete");
				this.reportProgress(payload.gathererId, "complete");
				data[payload.gathererId] = payload.data;
			});

			promises.push(module.executeGatherers(context));
		}

		await Promise.all(promises);

		this._logger.trace("gatherers complete");

		return data;
	}

	private async reportProgress(id: string, status: GatherersStatus) {
		const { meta } = (await this._storage.get(this._id)) ?? {};
		if (meta === undefined) {
			return;
		}

		let progress = meta.progress;
		if (status === "complete") {
			const completedGatherers = Object.values(meta.gatherersStatus).filter(
				(status) => status === "complete",
			);
			progress =
				(completedGatherers.length + 1) /
				Object.keys(meta.gatherersStatus).length;
			this._logger.trace({ progress: progress * 100 }, "progress");
		}

		this.saveState({
			meta: {
				step: this._currentStep,
				progress,
				gatherersStatus: { [id]: status },
			},
		});
	}

	private async initGatherersMeta() {
		const initialGatherersMeta: ModuleProcessorMeta["gatherersStatus"] = {};
		for (const module of this._modules) {
			for (const gatherer of module.gatherers) {
				initialGatherersMeta[gatherer.id] = "waiting";
			}
		}

		await this.saveState({
			meta: {
				step: this._currentStep,
				progress: 0,
				gatherersStatus: initialGatherersMeta,
			},
		});
	}
}
