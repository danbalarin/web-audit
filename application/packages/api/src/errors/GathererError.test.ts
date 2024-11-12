import { describe, it, expect } from "@jest/globals";
import { GathererError } from "./GathererError";
import { TestGatherer } from "../__tests__/fixtures/TestGatherer";

describe("GathererError", () => {
  it("should set additional attributes", () => {
    const gatherer = new TestGatherer();
    const fn = () => {
      throw new GathererError(gatherer, "test", "arg1", "arg2");
    };
    try {
      fn();
    } catch (e) {
      expect(e).toBeInstanceOf(GathererError);
      expect((e as GathererError).gathererInstance).toBe(gatherer);
      expect((e as GathererError).message).toBe("test");
      expect((e as GathererError).args).toStrictEqual(["arg1", "arg2"]);
    }
  });
});
