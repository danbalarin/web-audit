import { BaseStorage, DeepPartial } from "../..";

type TestStorageOptions<T> = {
  getFn?: (key?: string) => Promise<T>;
  setFn?: (key: string, value: T) => Promise<void>;
  deleteFn?: (key: string) => Promise<void>;
  clearFn?: () => Promise<void>;
  appendFn?: (key: string, value: DeepPartial<T>) => Promise<void>;
};

export class TestStorage<T = any> extends BaseStorage<T> {
  private getFn: (key?: string) => Promise<T>;
  private setFn: (key: string, value: T) => Promise<void>;
  private deleteFn: (key: string) => Promise<void>;
  private clearFn: () => Promise<void>;
  private appendFn: (key: string, value: DeepPartial<T>) => Promise<void>;

  constructor(options: TestStorageOptions<T> = {}) {
    super();
    options.getFn
      ? (this.getFn = options.getFn)
      : (this.getFn = () => Promise.resolve("" as T));
    options.setFn
      ? (this.setFn = options.setFn)
      : (this.setFn = () => Promise.resolve());
    options.deleteFn
      ? (this.deleteFn = options.deleteFn)
      : (this.deleteFn = () => Promise.resolve());
    options.clearFn
      ? (this.clearFn = options.clearFn)
      : (this.clearFn = () => Promise.resolve());
    options.appendFn
      ? (this.appendFn = options.appendFn)
      : (this.appendFn = () => Promise.resolve());
  }
  public get(key: string): Promise<any> {
    return this.getFn(key);
  }

  public set(key: string, value: any): Promise<void> {
    return this.setFn(key, value);
  }

  public async delete(key: string): Promise<void> {
    return this.deleteFn(key);
  }

  public async clear(): Promise<void> {
    return this.clearFn();
  }

  public async append(key: string, value: DeepPartial<T>): Promise<void> {
    return this.appendFn(key, value);
  }
}
