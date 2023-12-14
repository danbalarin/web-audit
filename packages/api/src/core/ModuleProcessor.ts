import { v4 as uuid } from "uuid";

import { BaseStorage } from "./Storage";
import { BaseModule } from "./Module";
import { BaseContext } from "./Context";

type ModuleProcessorMeta = {
  currentStep: "gatherers" | "dataPreprocessing" | "audits";
  progress: number;
};

type ModuleProcessorState = {
  id: string;
  meta: ModuleProcessorMeta;
  modulesData: Record<string, any>;
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
    context: TContext
  ) {
    const id = uuid();
    this.processAsync(id, modules, context);
    return id;
  }

  private async processAsync<TContext extends BaseContext = BaseContext>(
    id: string,
    modules: Record<string, BaseModule>,
    context: TContext
  ) {
    const moduleEntries = Object.entries(modules);
    await this.processGatherers(
      id,
      moduleEntries.map((v) => v[1]),
      context
    );
    // TODO: data preprocessing
  }

  private async processGatherers<TContext extends BaseContext = BaseContext>(
    id: string,
    modules: BaseModule[],
    context: TContext
  ) {
    this._storage.append(id, {
      meta: { currentStep: "gatherers", progress: 0 },
    });
    const data = {} as Record<string, any>;
    let i = 0;
    for (const module of modules) {
      ++i;
      const res = await module.executeGatherers(context);
      this._storage.append(id, { meta: { progress: modules.length / i } });
      data[module.id] = res;
    }
    return data;
  }
}
