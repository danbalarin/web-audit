import merge from "ts-deepmerge";
import { createClient, RedisClientType } from "redis";

import { DeepPartial } from "../../types/DeepPartial";
import { BaseStorage } from "./BaseStorage";

type RedisStorageOptions = {
  host: string;
  port: number;
};

export class RedisStorage<
  TData extends object = object,
> extends BaseStorage<TData> {
  private _client: RedisClientType;

  constructor(options: RedisStorageOptions) {
    super();
    this._client = createClient({
      url: `redis://${options.host}:${options.port}`,
    });
  }

  public async get(key: string) {
    await this._client.connect();
    const str = (await this._client.get(key)) ?? null;
    await this._client.quit();
    if (str === null) {
      return null;
    }
    return JSON.parse(str) as TData;
  }

  public async set(key: string, value: TData) {
    await this._client.connect();
    await this._client.set(key, JSON.stringify(value));
    await this._client.quit();
  }

  public async delete(key: string) {
    await this._client.connect();
    await this._client.del(key);
    await this._client.quit();
  }

  public async clear() {
    await this._client.connect();
    await this._client.flushDb();
    await this._client.quit();
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
