import { describe, expect, it } from "@jest/globals";
import { MemoryStorage } from "./MemoryStorage";

describe("MemoryStorage", () => {
	it("should set and get value", async () => {
		const storage = new MemoryStorage<{ name: string }>();
		await storage.set("key", { name: "test" });
		const value = await storage.get("key");
		expect(value).toStrictEqual({ name: "test" });
	});

	it("should delete value", async () => {
		const storage = new MemoryStorage<{ name: string }>();
		await storage.set("key", { name: "test" });
		await storage.delete("key");
		const value = await storage.get("key");
		expect(value).toBe(null);
	});

	it("should clear values", async () => {
		const storage = new MemoryStorage<{ name: string }>();
		await storage.set("key", { name: "test" });
		await storage.clear();
		const value = await storage.get("key");
		expect(value).toBe(null);
	});

	it("should append value", async () => {
		const storage = new MemoryStorage<{ name: string; result: string }>();
		await storage.append("key", { name: "test" });
		const value = await storage.get("key");
		expect(value).toStrictEqual({ name: "test" });

		await storage.append("key", { result: "result" });
		const value2 = await storage.get("key");
		expect(value2).toStrictEqual({ name: "test", result: "result" });
	});

	it("should append overwrite value", async () => {
		const storage = new MemoryStorage<{ name: string }>();
		await storage.append("key", { name: "test" });
		await storage.append("key", { name: "test2" });
		const value = await storage.get("key");
		expect(value).toStrictEqual({ name: "test2" });
	});
});
