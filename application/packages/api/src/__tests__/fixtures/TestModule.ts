import { BaseModule, ModuleOptions } from "../..";

export class TestModule extends BaseModule {
  constructor(options: Partial<ModuleOptions> = {}) {
    super({
      name: "Test",
      description: "Test Module",
      version: "1.0.0",
      id: "test",
      gatherers: [],
      ...options,
    });
  }
}
