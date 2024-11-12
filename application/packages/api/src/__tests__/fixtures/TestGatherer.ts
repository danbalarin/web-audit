import {
  BaseGatherer,
  GathererOptions,
  GathererProgressEventPayload,
} from "../..";

export class TestGatherer extends BaseGatherer {
  constructor(
    options: Partial<GathererOptions> = {},
    private executeCallback?: (...args: any[]) => Promise<any>,
    private progressEmit?: GathererProgressEventPayload,
  ) {
    super({
      id: "test",
      name: "Test",
      version: "1.0.0",
      ...options,
    });
  }

  async execute(...args: any[]) {
    if (this.progressEmit) {
      this.emit("progress", this.progressEmit);
    }
    if (this.executeCallback) {
      return this.executeCallback(...args);
    }
    return "test";
  }
}
