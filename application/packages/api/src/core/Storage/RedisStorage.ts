import merge from "ts-deepmerge";
import { createClient, RedisClientType } from "redis";

import { DeepPartial } from "../../types/DeepPartial";
import { BaseStorage } from "./BaseStorage";

type RedisStorageOptions = {
  host: string;
  port: number;
  timeout?: number;
};

export class RedisStorage<
  TData extends object = object,
> extends BaseStorage<TData> {
  private _client: RedisClientType;
  private _quitTimeout: NodeJS.Timeout | null = null;
  private _timeout: number;

  constructor(options: RedisStorageOptions) {
    super();
    this._client = createClient({
      url: `redis://${options.host}:${options.port}`,
    });
    this._timeout = options.timeout ?? 5000;
  }

  public async get(key: string) {
    await this.ensureConnection();
    const str = (await this._client.get(key)) ?? null;
    if (str === null) {
      return null;
    }
    return JSON.parse(str) as TData;
  }

  public async set(key: string, value: TData) {
    await this.ensureConnection();
    await this._client.set(key, JSON.stringify(value));
  }

  public async delete(key: string) {
    await this.ensureConnection();
    await this._client.del(key);
  }

  public async clear() {
    await this.ensureConnection();
    await this._client.flushDb();
  }

  public async append(key: string, value: DeepPartial<TData>) {
    const data = await this.get(key);
    if (data === null) {
      await this.set(key, value as TData);
      return;
    }
    await this.set(key, merge(data, value) as TData);
  }

  private async ensureConnection() {
    await this._client.connect().catch(() => void 0);
    this._quitTimeout && clearTimeout(this._quitTimeout);
    this._quitTimeout = setTimeout(() => {
      this._client.quit();
    }, this._timeout);
  }
}
