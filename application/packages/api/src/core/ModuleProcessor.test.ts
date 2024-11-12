import { describe, expect, it, jest } from "@jest/globals";
import { ModuleProcessor } from "./ModuleProcessor";
import { TestStorage } from "../__tests__/fixtures/TestStorage";
import { TestModule } from "../__tests__/fixtures/TestModule";
import { TestGatherer } from "../__tests__/fixtures/TestGatherer";

describe("ModuleProcessor", () => {
  it("should return unique id", () => {
    const storage = new TestStorage();
    const processor = new ModuleProcessor({ storage });
    const id = processor.process({}, { browser: {} as any, url: "" });

    expect(id).toBeDefined();

    const id2 = processor.process({}, { browser: {} as any, url: "" });

    expect(id2).toBeDefined();
    expect(id).not.toEqual(id2);
  });

  it("should return id without waiting for async operations", () => {
    const storage = new TestStorage();
    const processor = new ModuleProcessor({ storage });

    let gathererResolve: (value: unknown) => void = () => {};
    const gathererSpy = jest.fn(
      () =>
        new Promise((res) => {
          gathererResolve = res;
        }),
    );
    const gatherer = new TestGatherer({}, gathererSpy);
    const module = new TestModule({ gatherers: { test: gatherer } });
    expect(gathererSpy).not.toHaveBeenCalled();
    const id = processor.process(
      { test: module },
      { browser: {} as any, url: "" },
    );
    expect(id).toBeDefined();
    expect(gathererSpy).toHaveBeenCalledTimes(1);
    gathererResolve("result");
  });

  it("should execute modules in order", async () => {
    const storage = new TestStorage();
    const processor = new ModuleProcessor({ storage });
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
    const moduleOne = new TestModule({ gatherers: { gathererOne } });
    const moduleTwo = new TestModule({ gatherers: { gathererTwo } });

    processor.process(
      { one: moduleOne, two: moduleTwo },
      { browser: {} as any, url: "" },
    );

    expect(spyOne).toHaveBeenCalledTimes(1);
    expect(spyTwo).not.toHaveBeenCalled();
    gathererResolve("result");
    await new Promise((res) => setTimeout(res, 1));
    expect(spyTwo).toHaveBeenCalledTimes(1);
  });

  it("should append gatherer data to storage", async () => {
    const appendSpy = jest.fn(() => Promise.resolve());
    const storage = new TestStorage({ appendFn: appendSpy });
    const processor = new ModuleProcessor({ storage });
    const gatherer = new TestGatherer({ id: "gathererId" }, () =>
      Promise.resolve("result"),
    );
    const module = new TestModule({ gatherers: { gatherer } });

    const id = processor.process(
      { test: module },
      { browser: {} as any, url: "" },
    );

    await new Promise((res) => setTimeout(res, 100));

    expect(appendSpy).toHaveBeenCalledWith(id, {
      meta: { currentStep: "gatherers", progress: 0 },
    });

    expect(appendSpy).toHaveBeenCalledWith(id, {
      meta: { progress: 1 },
      modules: { test: { gatherers: { gathererId: "result" } } },
    });
  });
});
