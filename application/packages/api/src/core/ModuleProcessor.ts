import { v4 as uuid } from "uuid";

import { BaseStorage } from "./Storage";
import { BaseModule } from "./Module";
import { BaseContext } from "./Context";
import { DeepPartial } from "~/types/DeepPartial";

type Step = "ready" | "gatherers" | "dataPreprocessing" | "audits" | "done";

type GatherersStatus = "complete" | "inProgress" | "waiting";

type ModuleProcessorMeta = {
  step: Step;
  gatherersStatus: Record<string, GatherersStatus>;
  progress: number;
};

type ModuleData = {
  gatherers: Record<string, any>;
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
};

export class ModuleProcessor {
  private _storage: BaseStorage<ModuleProcessorState>;
  private _currentStep: Step = "ready";
  private _modules: BaseModule[] = [];
  private readonly _id = uuid();

  constructor(private _options: ModuleProcessorOptions) {
    this._storage = _options.storage;
    this._modules = _options.modules;
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
    await this._storage.append(this._id, data);
  }

  private async processAsync<TContext extends BaseContext = BaseContext>(
    context: TContext,
  ) {
    const gatherersData = await this.processGatherers(context);

    this.saveState({ modules: gatherersData });

    return gatherersData;
    // TODO: data preprocessing
  }

  private async processGatherers<TContext extends BaseContext = BaseContext>(
    context: TContext,
  ) {
    console.log("Processing gatherers");
    this._currentStep = "gatherers";

    const data = {} as Record<string, any>;
    await this.initGatherersMeta();
    const promises = [];

    for (const module of Object.values(this._modules)) {
      module.on("gatherer:start", (payload) => {
        console.log(`${module.id} => ${payload.gathererId} start`);
        this.reportProgress(payload.gathererId, "inProgress");
      });

      module.on("gatherer:complete", (payload) => {
        console.log(`${module.id} => ${payload.gathererId} complete`);
        this.reportProgress(payload.gathererId, "complete");
        data[payload.gathererId] = payload.data;
      });

      promises.push(module.executeGatherers(context));
    }

    await Promise.all(promises);

    console.log("Gatherers complete");

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
      console.log(`${progress * 100}%`);
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
      const gatherers = module.gatherers;
      gatherers.forEach((gatherer) => {
        initialGatherersMeta[gatherer.id] = "waiting";
      });
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
