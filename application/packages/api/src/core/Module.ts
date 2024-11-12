import { BaseGatherer } from "./Gatherer";
import { EventEmitter } from "../utils/EventEmitter";
import { BaseContext } from "./Context";

export type ModuleOptions = {
  id: string;
  name: string;
  description: string;
  version: string;
  gatherers: BaseGatherer[];
};

export type ModuleGathererStartEventPayload = {
  gathererId: string;
};

export type ModuleGathererCompleteEventPayload<TData = unknown> = {
  gathererId: string;
  data: TData;
};

export type ModuleGathererProgressEventPayload<TData = unknown> = {
  progress: number;
  gathererId: string;
  data: TData;
};

export type ModuleEvents = {
  "gatherer:start": ModuleGathererStartEventPayload;
  "gatherer:complete": ModuleGathererCompleteEventPayload;
  "gatherer:progress": ModuleGathererProgressEventPayload;
};

export abstract class BaseModule<
  TContext extends BaseContext = BaseContext,
> extends EventEmitter<ModuleEvents> {
  private _gatherers: BaseGatherer[] = [];

  constructor(private readonly _options: ModuleOptions) {
    super();
    this._gatherers = _options.gatherers;
  }

  async executeGatherers(context: TContext) {
    const gatherers = Object.values(this._gatherers);
    const results = {} as Record<string, unknown>;

    for (const gatherer of gatherers) {
      this.emit("gatherer:start", {
        gathererId: gatherer.id,
      });

      gatherer.on("progress", (payload) => {
        this.emit("gatherer:progress", {
          gathererId: gatherer.id,
          ...payload,
        });
      });

      results[gatherer.id] = await gatherer.execute(context);

      this.emit("gatherer:complete", {
        gathererId: gatherer.id,
        data: results[gatherer.id],
      });
    }

    return results;
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

  get gatherers() {
    return this._gatherers;
  }

  getGatherer<TGatherer extends BaseGatherer>(
    id: string,
  ): TGatherer | undefined {
    return this._gatherers.find((g) => g.id === id) as TGatherer;
  }
}
