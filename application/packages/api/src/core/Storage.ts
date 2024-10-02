import { DeepPartial } from "~/types/DeepPartial";
import merge from "ts-deepmerge";

export abstract class BaseStorage<TData = unknown> {
  constructor() {}

  public abstract get(key: string): Promise<TData | null>;

  public abstract set(key: string, value: TData): Promise<void>;

  public abstract delete(key: string): Promise<void>;

  public abstract clear(): Promise<void>;

  public abstract append(key: string, value: DeepPartial<TData>): Promise<void>;
}

export class MemoryStorage<
  TData extends object = object,
> extends BaseStorage<TData> {
  private _data: Map<string, TData> = new Map();

  public async get(key: string) {
    return this._data.get(key) ?? null;
  }

  public async set(key: string, value: TData) {
    this._data.set(key, value);
  }

  public async delete(key: string) {
    this._data.delete(key);
  }

  public async clear() {
    this._data = new Map();
  }

  public async append(key: string, value: DeepPartial<TData>) {
    const data = await this.get(key);
    if (data === null) {
      await this.set(key, value as TData);
      return;
    }
    await this.set(key, merge(data, value) as TData);
  }
}
