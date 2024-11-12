import { describe, it, expect, jest } from "@jest/globals";
import Redis from "redis";
import { RedisStorage } from "./RedisStorage";

jest.mock("redis", () => ({
  createClient: jest.fn(),
}));

describe("RedisStorage", () => {
  it("should create client with provided values", () => {
    new RedisStorage({ host: "host", port: 1234 });
    expect(Redis.createClient).toHaveBeenCalledWith({
      url: "redis://host:1234",
    });
  });

  it("should connect and quit after each operation", async () => {
    const client = {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
      flushDb: jest.fn(),
      connect: jest.fn(),
      quit: jest.fn(),
    };
    (Redis.createClient as jest.Mock).mockReturnValue(client);
    const storage = new RedisStorage<{ name: string }>({
      host: "host",
      port: 1234,
    });
    expect(client.connect).not.toHaveBeenCalled();
    expect(client.quit).not.toHaveBeenCalled();

    await storage.set("key", { name: "test" });
    expect(client.connect).toHaveBeenCalledTimes(1);
    expect(client.quit).toHaveBeenCalledTimes(1);
    client.connect.mockClear();
    client.quit.mockClear();

    await storage.get("key");
    expect(client.connect).toHaveBeenCalledTimes(1);
    expect(client.quit).toHaveBeenCalledTimes(1);
    client.connect.mockClear();
    client.quit.mockClear();

    await storage.delete("key");
    expect(client.connect).toHaveBeenCalledTimes(1);
    expect(client.quit).toHaveBeenCalledTimes(1);
    client.connect.mockClear();
    client.quit.mockClear();

    await storage.clear();
    expect(client.connect).toHaveBeenCalledTimes(1);
    expect(client.quit).toHaveBeenCalledTimes(1);
    client.connect.mockClear();
    client.quit.mockClear();

    await storage.append("key", { name: "test" });
    expect(client.connect).toHaveBeenCalledTimes(2);
    expect(client.quit).toHaveBeenCalledTimes(2);
  });

  it("should set and get value", async () => {
    const client = {
      set: jest.fn(),
      get: jest.fn(),
      connect: jest.fn(),
      quit: jest.fn(),
    };
    (Redis.createClient as jest.Mock).mockReturnValue(client);
    const storage = new RedisStorage<{ name: string }>({
      host: "host",
      port: 1234,
    });
    await storage.set("key", { name: "test" });
    expect(client.set).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "test" }),
    );
    client.get.mockImplementation(() => JSON.stringify({ name: "test" }));

    const value = await storage.get("key");
    expect(value).toStrictEqual({ name: "test" });
  });

  it("should merge with append", async () => {
    const client = {
      set: jest.fn(),
      get: jest.fn(),
      connect: jest.fn(),
      quit: jest.fn(),
    };
    (Redis.createClient as jest.Mock).mockReturnValue(client);
    const storage = new RedisStorage<{ name: string; result: string }>({
      host: "host",
      port: 1234,
    });
    await storage.append("key", { name: "test" });
    expect(client.set).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "test" }),
    );

    client.get.mockResolvedValue(JSON.stringify({ name: "test" }) as never);
    await storage.append("key", { name: "test2" });
    expect(client.set).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "test2" }),
    );

    client.get.mockResolvedValue(JSON.stringify({ name: "test2" }) as never);
    await storage.append("key", { result: "result" });
    expect(client.set).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "test2", result: "result" }),
    );
  });
});
