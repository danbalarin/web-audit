import { BaseContext, BaseGatherer, GathererError } from "@repo/api";
import lighthouse, { Flags } from "lighthouse";
import { computeMedianRun } from "lighthouse/core/lib/median-run.js";

export type PerformanceGathererOptions = {
  numberOfRuns: number;
};

export class PerformanceGatherer extends BaseGatherer {
  constructor(
    private readonly _performanceGathererOptions: PerformanceGathererOptions
  ) {
    super({
      description: "Performance Gatherer",
      name: "Lighthouse Performance",
      version: "1.0.0",
      id: "lighthouse.performance",
    });
  }

  async execute(context: BaseContext) {
    const options: Flags = {
      logLevel: "info",
      output: "json",
      onlyCategories: ["performance"],
      gatherMode: true,
    };

    const runs = [];
    for (let i = 0; i < this._performanceGathererOptions.numberOfRuns; i++) {
      const page = await context.browser.newPage();
      const result = await lighthouse(context.url, options, undefined, page);
      await page.close();
      if (!result) {
        throw new GathererError(this, "Could not run lighthouse", { options });
      }
      runs.push(result);
    }

    try {
      const result = computeMedianRun(runs);
      return result;
    } catch (error) {
      throw new GathererError(this, "Could not compute median run", { error });
    }
  }
}
