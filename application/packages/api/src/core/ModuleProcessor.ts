import { v4 as uuid } from "uuid";

import { BaseStorage } from "./Storage";
import { BaseModule } from "./Module";
import { BaseContext } from "./Context";

type ModuleProcessorMeta = {
  currentStep: "gatherers" | "dataPreprocessing" | "audits";
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
};

export class ModuleProcessor {
  private _storage: BaseStorage<ModuleProcessorState>;
  constructor(private _options: ModuleProcessorOptions) {
    this._storage = _options.storage;
  }

  public process<TContext extends BaseContext = BaseContext>(
    modules: Record<string, BaseModule>,
    context: TContext,
  ) {
    const id = uuid();
    this.processAsync(id, modules, context);
    return id;
  }

  private async processAsync<TContext extends BaseContext = BaseContext>(
    id: string,
    modules: Record<string, BaseModule>,
    context: TContext,
  ) {
    // const moduleEntries = Object.entries(modules);
    const gatherersData = await this.processGatherers(
      id,
      Object.values(modules),
      context,
    );

    return gatherersData;
    // TODO: data preprocessing
  }

  private async processGatherers<TContext extends BaseContext = BaseContext>(
    id: string,
    modules: BaseModule[],
    context: TContext,
  ) {
    this._storage.append(id, {
      meta: { currentStep: "gatherers", progress: 0 },
    });
    const data = {} as Record<string, any>;
    let i = 0;
    for (const module of modules) {
      ++i;
      const res = await module.executeGatherers(context);
      this._storage.append(id, {
        meta: { progress: modules.length / i },
        modules: { [module.id]: { gatherers: res } },
      });
      data[module.id] = res;
    }
    return data;
  }
}
