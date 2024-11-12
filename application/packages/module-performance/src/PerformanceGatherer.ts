import { BaseContext, BaseGatherer, GathererError } from "@repo/api";
// @ts-ignore
import lighthouse, { Flags, Result } from "lighthouse";
// @ts-ignore
import { computeMedianRun } from "lighthouse/core/lib/median-run.js";

export type PerformanceGathererOptions = {
  numberOfRuns: number;
};

export class PerformanceGatherer extends BaseGatherer {
  constructor(
    private readonly _performanceGathererOptions: PerformanceGathererOptions,
  ) {
    super({
      description: "Performance Gatherer using Lighthouse",
      name: "Performance Gatherer",
      version: "1.0.0",
      id: "performance.gatherer",
    });
  }

  async execute(context: BaseContext) {
    const options = {
      output: "json",
      onlyCategories: ["performance"],
      onlyAudits: [
        "first-contentful-paint",
        "largest-contentful-paint",
        "first-meaningful-paint",
        "speed-index",
        "total-blocking-time",
        "max-potential-fid",
        "cumulative-layout-shift",
        "interaction-to-next-paint",
      ],
    } satisfies Flags;

    const runs: Result[] = [];
    for (let i = 0; i < this._performanceGathererOptions.numberOfRuns; i++) {
      const page = await context.browser.newPage();
      const result = await lighthouse(context.url, options, undefined, page);
      await page.close();
      if (!result?.artifacts) {
        throw new GathererError(this, "Could not run lighthouse", { options });
      }
      runs.push(result.lhr);
    }

    try {
      const result: Result = computeMedianRun(runs);
      return result;
    } catch (error) {
      throw new GathererError(this, "Could not compute median run", { error });
    }
  }
}
