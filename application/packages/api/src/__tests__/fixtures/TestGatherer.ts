import {
	BaseGatherer,
	type GathererOptions,
	type GathererProgressEventPayload,
} from "../..";

export class TestGatherer extends BaseGatherer {
	constructor(
		options: Partial<GathererOptions> = {},
		private executeCallback?: (...args: unknown[]) => Promise<unknown>,
		private progressEmit?: GathererProgressEventPayload,
	) {
		super({
			id: "test",
			name: "Test",
			version: "1.0.0",
			...options,
		});
	}

	async execute(...args: unknown[]) {
		if (this.progressEmit) {
			this.emit("progress", this.progressEmit);
		}
		if (this.executeCallback) {
			return this.executeCallback(...args);
		}
		return "test";
	}
}
