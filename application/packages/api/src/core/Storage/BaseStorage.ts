import type { DeepPartial } from "../../types/DeepPartial";

export abstract class BaseStorage<TData = unknown> {
	public abstract get(key: string): Promise<TData | null>;

	public abstract set(key: string, value: TData): Promise<void>;

	public abstract delete(key: string): Promise<void>;

	public abstract clear(): Promise<void>;

	public abstract append(key: string, value: DeepPartial<TData>): Promise<void>;
}
