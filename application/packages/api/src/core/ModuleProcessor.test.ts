import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { TestGatherer } from "../__tests__/fixtures/TestGatherer";
import { TestModule } from "../__tests__/fixtures/TestModule";
import { TestStorage } from "../__tests__/fixtures/TestStorage";
import { ModuleProcessor, type ModuleProcessorState } from "./ModuleProcessor";
import { MemoryStorage } from "./Storage";

// biome-ignore lint/suspicious/noExplicitAny: test plug
const context = { browser: {} as any, url: "" };

// biome-ignore lint/suspicious/noEmptyBlockStatements: noop fn
const noopFn = () => {};

describe("ModuleProcessor", () => {
	beforeEach(() => {
		jest.spyOn(console, "log").mockImplementation(noopFn);
	});
	it("should return unique id", () => {
		const storage = new TestStorage();
		const processor = new ModuleProcessor({ storage, modules: [] });
		const id = processor.process(context);

		expect(id).toBeDefined();

		const processor2 = new ModuleProcessor({ storage, modules: [] });
		const id2 = processor2.process(context);

		expect(id2).toBeDefined();
		expect(id).not.toEqual(id2);
	});

	it("should throw error if processor is already running", () => {
		const storage = new TestStorage();
		const processor = new ModuleProcessor({ storage, modules: [] });
		processor.process(context);

		expect(() => processor.process(context)).toThrow(
			"Processor is already running",
		);
	});

	it("should return id without waiting for async operations", async () => {
		const storage = new TestStorage();

		let gathererResolve: (value: unknown) => void = noopFn;
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
		const id = processor.process(context);
		await new Promise((res) => setTimeout(res, 1));
		expect(id).toBeDefined();
		expect(gathererSpy).toHaveBeenCalledTimes(1);
		gathererResolve("result");
	});

	// Not running in order but in parallel
	it.skip("should execute modules in order", async () => {
		const storage = new TestStorage();
		let gathererResolve: (value: unknown) => void = noopFn;
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

		processor.process(context);

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

		const id = processor.process(context);

		await new Promise((res) => setTimeout(res, 100));

		expect(appendSpy).toHaveBeenCalledWith(id, {
			meta: {
				step: "gatherers",
				progress: 0,
				gatherersStatus: { gathererId: "waiting" },
			},
		});

		expect(appendSpy).toHaveBeenCalledWith(id, {
			modules: { gatherers: { gathererId: "result" } },
		});
	});

	it("should calculate gatherer progress", async () => {
		const storage = new MemoryStorage<ModuleProcessorState>();
		let gathererResolve: (value: unknown) => void = noopFn;
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
		processor.process(context);
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
				// biome-ignore lint/suspicious/noExplicitAny: cast to suppress ts errors
			) as any
		).mockImplementation(noopFn);

		const storageSpy = jest.spyOn(storage, "append");
		processor.process(context);
		expect(storageSpy).not.toHaveBeenCalled();
	});
});
