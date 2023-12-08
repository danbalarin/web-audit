import { BaseModule } from "@repo/api";
import {
  PerformanceGatherer,
  PerformanceGathererOptions,
} from "./PerformanceGatherer.js";

export type LighthouseModuleOptions = {
  performanceOptions: PerformanceGathererOptions;
};

export class LighthouseModule extends BaseModule {
  constructor(
    private readonly _lighthouseModuleOptions: LighthouseModuleOptions
  ) {
    super({
      description: "Lighthouse Module",
      name: "Lighthouse",
      version: "1.0.0",
      id: "lighthouse",
      gatherers: {
        performance: new PerformanceGatherer(
          _lighthouseModuleOptions.performanceOptions
        ),
      },
    });
  }
}
