import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { ModuleProcessor, ModuleProcessorState } from "./ModuleProcessor";
import { TestStorage } from "../__tests__/fixtures/TestStorage";
import { TestModule } from "../__tests__/fixtures/TestModule";
import { TestGatherer } from "../__tests__/fixtures/TestGatherer";
import { MemoryStorage } from "./Storage";

describe("ModuleProcessor", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });
  it("should return unique id", () => {
    const storage = new TestStorage();
    const processor = new ModuleProcessor({ storage, modules: [] });
    const id = processor.process({ browser: {} as any, url: "" });

    expect(id).toBeDefined();

    const processor2 = new ModuleProcessor({ storage, modules: [] });
    const id2 = processor2.process({ browser: {} as any, url: "" });

    expect(id2).toBeDefined();
    expect(id).not.toEqual(id2);
  });

  it("should throw error if processor is already running", () => {
    const storage = new TestStorage();
    const processor = new ModuleProcessor({ storage, modules: [] });
    processor.process({ browser: {} as any, url: "" });

    expect(() => processor.process({ browser: {} as any, url: "" })).toThrow(
      "Processor is already running",
    );
  });

  it("should return id without waiting for async operations", async () => {
    const storage = new TestStorage();

    let gathererResolve: (value: unknown) => void = () => {};
    const gathererSpy = jest.fn(
      () =>
        new Promise((res) => {
          gathererResolve = res;
        }),
    );
    const gatherer = new TestGatherer({}, gathererSpy);
    const module = new TestModule({ gatherers: [gatherer] });
    const processor = new ModuleProcessor({ storage, modules: [module] });

    expect(gathererSpy).not.toHaveBeenCalled();
    const id = processor.process({ browser: {} as any, url: "" });
    await new Promise((res) => setTimeout(res, 1));
    expect(id).toBeDefined();
    expect(gathererSpy).toHaveBeenCalledTimes(1);
    gathererResolve("result");
  });

  // Not running in order but in parallel
  it.skip("should execute modules in order", async () => {
    const storage = new TestStorage();
    let gathererResolve: (value: unknown) => void = () => {};
    const spyOne = jest.fn(
      () =>
        new Promise((res) => {
          gathererResolve = res;
        }),
    );
    const spyTwo = jest.fn(() => Promise.resolve("two"));
    const gathererOne = new TestGatherer({}, spyOne);
    const gathererTwo = new TestGatherer({}, spyTwo);
    const moduleOne = new TestModule({ gatherers: [gathererOne] });
    const moduleTwo = new TestModule({ gatherers: [gathererTwo] });
    const processor = new ModuleProcessor({
      storage,
      modules: [moduleOne, moduleTwo],
    });

    processor.process({ browser: {} as any, url: "" });

    expect(spyOne).toHaveBeenCalledTimes(1);
    expect(spyTwo).not.toHaveBeenCalled();
    gathererResolve("result");
    await new Promise((res) => setTimeout(res, 1));
    expect(spyTwo).toHaveBeenCalledTimes(1);
  });

  it("should append gatherer data to storage", async () => {
    const appendSpy = jest.fn(() => Promise.resolve());
    const storage = new TestStorage({ appendFn: appendSpy });
    const gatherer = new TestGatherer({ id: "gathererId" }, () =>
      Promise.resolve("result"),
    );
    const module = new TestModule({ gatherers: [gatherer] });
    const processor = new ModuleProcessor({ storage, modules: [module] });

    const id = processor.process({ browser: {} as any, url: "" });

    await new Promise((res) => setTimeout(res, 100));

    expect(appendSpy).toHaveBeenCalledWith(id, {
      meta: {
        step: "gatherers",
        progress: 0,
        gatherersStatus: { gathererId: "waiting" },
      },
    });

    expect(appendSpy).toHaveBeenCalledWith(id, {
      modules: { gathererId: "result" },
    });
  });

  it("should calculate gatherer progress", async () => {
    const storage = new MemoryStorage<ModuleProcessorState>();
    let gathererResolve: (value: unknown) => void = () => {};
    const gatherer = new TestGatherer(
      { id: "gathererId" },
      () =>
        new Promise((res) => {
          gathererResolve = res;
        }),
    );
    const module = new TestModule({ gatherers: [gatherer] });
    const processor = new ModuleProcessor({ storage, modules: [module] });

    const storageSpy = jest.spyOn(storage, "append");
    processor.process({ browser: {} as any, url: "" });
    expect(storageSpy).toHaveBeenCalledWith(expect.any(String), {
      meta: {
        step: "gatherers",
        progress: 0,
        gatherersStatus: { gathererId: "waiting" },
      },
    });

    await new Promise((res) => setTimeout(res, 100));
    expect(storageSpy).toHaveBeenCalledWith(expect.any(String), {
      meta: {
        step: "gatherers",
        progress: 0,
        gatherersStatus: { gathererId: "inProgress" },
      },
    });

    gathererResolve("result");
    await new Promise((res) => setTimeout(res, 100));

    expect(storageSpy).toHaveBeenCalledWith(expect.any(String), {
      meta: {
        step: "gatherers",
        progress: 1,
        gatherersStatus: { gathererId: "complete" },
      },
    });
  });

  it("should not report if meta is not present", async () => {
    const storage = new TestStorage<ModuleProcessorState>({
      getFn: () => Promise.resolve(null as unknown as ModuleProcessorState),
    });
    const gatherer = new TestGatherer({ id: "gathererId" }, () =>
      Promise.resolve("result"),
    );
    const module = new TestModule({ gatherers: [gatherer] });
    const processor = new ModuleProcessor({ storage, modules: [module] });
    (
      jest.spyOn(
        processor as unknown as ModuleProcessor["initGatherersMeta"],
        "initGatherersMeta" as never,
      ) as any
    ).mockImplementation(() => {});

    const storageSpy = jest.spyOn(storage, "append");
    processor.process({ browser: {} as any, url: "" });
    expect(storageSpy).not.toHaveBeenCalled();
  });
});
