import { describe, expect, it, jest } from "@jest/globals";
import { EventEmitter } from "./EventEmitter";

describe("EventEmitter", () => {
	it("should emit events", () => {
		const emitter = new EventEmitter<{ test: string }>();

		const listener = jest.fn();

		emitter.on("test", listener);
		emitter.emit("test", "data");

		expect(listener).toHaveBeenCalledWith("data");
	});

	it("should remove listener", () => {
		const emitter = new EventEmitter<{ test: string }>();

		const listener = jest.fn();

		const unsubscribe = emitter.on("test", listener);
		emitter.emit("test", "data");

		expect(listener).toHaveBeenCalledWith("data");
		unsubscribe();
		listener.mockReset();

		emitter.emit("test", "something else");
		expect(listener).not.toHaveBeenCalled();
	});
});
