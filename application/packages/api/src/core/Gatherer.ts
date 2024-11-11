import { EventEmitter } from "../utils/EventEmitter";
import { BaseContext } from "./Context";

export type GathererOptions = {
  id: string;
  name: string;
  description?: string;
  version: string;
};

export type GathererProgressEventPayload<TData = unknown> = {
  progress: number;
  data: TData;
};

export type GathererCompleteEventPayload<TData = unknown> = {
  data: TData;
};

export type GathererEvents = {
  progress: GathererProgressEventPayload;
  // complete: GathererCompleteEventPayload;
};

export abstract class BaseGatherer<
  TResult = unknown,
  TContext extends BaseContext = BaseContext,
> extends EventEmitter<GathererEvents> {
  constructor(private readonly _options: GathererOptions) {
    super();
  }

  abstract execute(context: TContext): Promise<TResult>;

  // GETTERS
  /* istanbul ignore next */
  get id() {
    return this._options.id;
  }

  /* istanbul ignore next */
  get name() {
    return this._options.name;
  }

  /* istanbul ignore next */
  get description() {
    return this._options.description;
  }

  /* istanbul ignore next */
  get version() {
    return this._options.version;
  }
}
