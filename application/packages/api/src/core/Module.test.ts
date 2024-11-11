import { describe, it, expect, jest } from "@jest/globals";
import {
  BaseGatherer,
  GathererOptions,
  GathererProgressEventPayload,
} from "./Gatherer";
import { BaseModule, ModuleOptions } from "./Module";

class TestGatherer extends BaseGatherer {
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

class TestModule extends BaseModule {
  constructor(options: Partial<ModuleOptions> = {}) {
    super({
      name: "Test",
      description: "Test Module",
      version: "1.0.0",
      id: "test",
      gatherers: [] as Record<string, any>,
      ...options,
    });
  }
}

describe("Module", () => {
  it("should set basic info", () => {
    const module = new TestModule({
      id: "id",
      name: "name",
      version: "version",
      description: "description",
    });

    expect(module.id).toBe("id");
    expect(module.name).toBe("name");
    expect(module.version).toBe("version");
    expect(module.description).toBe("description");
  });

  it("should set gatherers", () => {
    const gatherer = new TestGatherer();
    const module = new TestModule({
      gatherers: {
        test: gatherer,
      },
    });

    expect(module.gatherers).toEqual({ test: gatherer });
  });

  it("should return correct gatherer", () => {
    const gatherer = new TestGatherer();
    const secondGatherer = new TestGatherer({ id: "second" });
    const module = new TestModule({
      gatherers: {
        test: gatherer,
        second: secondGatherer,
      },
    });

    expect(module.getGatherer("test")).toBe(gatherer);
    expect(module.getGatherer("second")).toBe(secondGatherer);
    expect(module.getGatherer("not-found")).toBeUndefined();
  });

  it("should execute gatherers", async () => {
    const spy = jest.fn(() => Promise.resolve("result"));
    const gatherer = new TestGatherer({ id: "gatherer" }, spy);
    const module = new TestModule({
      gatherers: {
        gatherer,
      },
    });

    expect(spy).not.toHaveBeenCalled();
    const result = await module.executeGatherers({} as any);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(result).toEqual({ gatherer: "result" });
  });

  it("should pass in context to gatherers", async () => {
    const spy = jest.fn(() => Promise.resolve("result"));
    const gatherer = new TestGatherer({ id: "gatherer" }, spy);
    const module = new TestModule({
      gatherers: {
        gatherer,
      },
    });

    expect(spy).not.toHaveBeenCalled();
    const context = { test: "context" };
    await module.executeGatherers(context as any);

    expect(spy).toHaveBeenCalledWith(context);
  });

  it("should emit gatherer events", async () => {
    const spy = jest.fn(() => Promise.resolve("result"));
    const gatherer = new TestGatherer({ id: "gatherer" }, spy, {
      progress: 0,
      data: "progress",
    });
    const module = new TestModule({
      gatherers: {
        gatherer,
      },
    });

    const startSpy = jest.fn();
    const progressSpy = jest.fn();
    const completeSpy = jest.fn();

    module.on("gatherer:start", startSpy);
    module.on("gatherer:progress", progressSpy);
    module.on("gatherer:complete", completeSpy);

    await module.executeGatherers({} as any);

    expect(startSpy).toHaveBeenCalledWith({ gathererId: "gatherer" });
    expect(progressSpy).toHaveBeenCalledWith({
      gathererId: "gatherer",
      progress: 0,
      data: "progress",
    });
    expect(completeSpy).toHaveBeenCalledWith({
      gathererId: "gatherer",
      data: "result",
    });
  });
});
