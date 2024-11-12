import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import Redis from "redis";
import { RedisStorage } from "./RedisStorage";

jest.mock("redis", () => ({
  createClient: jest.fn(),
}));

type AwaitableUnknownFunction = (...args: Array<unknown>) => Promise<unknown>;

const client = {
  set: jest.fn<AwaitableUnknownFunction>().mockResolvedValue(undefined),
  get: jest.fn<AwaitableUnknownFunction>().mockResolvedValue(undefined),
  connect: jest.fn<AwaitableUnknownFunction>().mockResolvedValue(undefined),
  quit: jest.fn<AwaitableUnknownFunction>().mockResolvedValue(undefined),
  del: jest.fn<AwaitableUnknownFunction>().mockResolvedValue(undefined),
  flushDb: jest.fn<AwaitableUnknownFunction>().mockResolvedValue(undefined),
};

describe("RedisStorage", () => {
  beforeEach(() => {
    Object.values(client).forEach((mock) => mock.mockClear());
    (Redis.createClient as jest.Mock).mockReturnValue(client);
  });
  it("should create client with provided values", () => {
    new RedisStorage({ host: "host", port: 1234 });
    expect(Redis.createClient).toHaveBeenCalledWith({
      url: "redis://host:1234",
    });
  });

  it("should return null if key is not found", async () => {
    const storage = new RedisStorage<{ name: string }>({
      host: "host",
      port: 1234,
    });
    client.get.mockResolvedValue(null);
    const value = await storage.get("key");
    expect(value).toBeNull();
  });

  it("should set and get value", async () => {
    const storage = new RedisStorage<{ name: string }>({
      host: "host",
      port: 1234,
    });
    await storage.set("key", { name: "test" });
    expect(client.set).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "test" }),
    );
    client.get.mockResolvedValue(JSON.stringify({ name: "test" }));

    const value = await storage.get("key");
    expect(value).toStrictEqual({ name: "test" });
  });

  it("should set with append if not present", async () => {
    const storage = new RedisStorage<{ name: string }>({
      host: "host",
      port: 1234,
    });

    client.get.mockResolvedValue(null);
    await storage.append("key", { name: "test" });
    expect(client.set).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "test" }),
    );
  });

  it("should merge with append", async () => {
    const storage = new RedisStorage<{ name: string; result: string }>({
      host: "host",
      port: 1234,
    });
    await storage.append("key", { name: "test" });
    expect(client.set).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "test" }),
    );

    client.get.mockResolvedValue(JSON.stringify({ name: "test" }));
    await storage.append("key", { name: "test2" });
    expect(client.set).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "test2" }),
    );

    client.get.mockResolvedValue(JSON.stringify({ name: "test2" }));
    await storage.append("key", { result: "result" });
    expect(client.set).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "test2", result: "result" }),
    );
  });

  it("should delete key", async () => {
    const storage = new RedisStorage<{ name: string }>({
      host: "host",
      port: 1234,
    });

    await storage.delete("key");
    expect(client.del).toHaveBeenCalledWith("key");
  });

  it("should empty db key", async () => {
    const storage = new RedisStorage<{ name: string }>({
      host: "host",
      port: 1234,
    });

    await storage.clear();
    expect(client.flushDb).toHaveBeenCalledWith();
  });

  it("should close after inactivity", async () => {
    const storage = new RedisStorage<{ name: string }>({
      host: "host",
      port: 1234,
      timeout: 100,
    });

    await storage.get("key");
    expect(client.quit).not.toHaveBeenCalled();
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(client.quit).toHaveBeenCalled();
  });

  it("should catch connection error", async () => {
    const storage = new RedisStorage<{ name: string }>({
      host: "host",
      port: 1234,
    });

    client.connect.mockRejectedValue(new Error("error"));
    await storage.get("key");
    expect(client.quit).not.toHaveBeenCalled();
  });
});
