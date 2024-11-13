import { BaseStorage, type DeepPartial } from "../..";

type TestStorageOptions<T> = {
	getFn?: (key?: string) => Promise<T>;
	setFn?: (key: string, value: T) => Promise<void>;
	deleteFn?: (key: string) => Promise<void>;
	clearFn?: () => Promise<void>;
	appendFn?: (key: string, value: DeepPartial<T>) => Promise<void>;
};

// biome-ignore lint/suspicious/noExplicitAny: test fixture
export class TestStorage<T = any> extends BaseStorage<T> {
	private getFn: (key?: string) => Promise<T>;
	private setFn: (key: string, value: T) => Promise<void>;
	private deleteFn: (key: string) => Promise<void>;
	private clearFn: () => Promise<void>;
	private appendFn: (key: string, value: DeepPartial<T>) => Promise<void>;

	constructor(options: TestStorageOptions<T> = {}) {
		super();
		const { getFn, setFn, deleteFn, clearFn, appendFn } = options;
		this.getFn = getFn ?? (() => Promise.resolve("" as T));
		this.setFn = setFn ?? (() => Promise.resolve());
		this.deleteFn = deleteFn ?? (() => Promise.resolve());
		this.clearFn = clearFn ?? (() => Promise.resolve());
		this.appendFn = appendFn ?? (() => Promise.resolve());
	}
	public get(key: string): Promise<T> {
		return this.getFn(key);
	}

	public set(key: string, value: T): Promise<void> {
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
