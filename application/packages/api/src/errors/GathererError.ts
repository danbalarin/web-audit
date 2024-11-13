import type { BaseGatherer } from "..";

export class GathererError extends Error {
	public args: unknown[];
	constructor(
		public readonly gathererInstance: BaseGatherer,
		message: string,
		...args: unknown[]
	) {
		super(message);
		this.name = "GathererError";
		this.args = args;
	}
}
