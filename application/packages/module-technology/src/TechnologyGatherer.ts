import { BaseContext, BaseGatherer } from "@repo/api";
import { analyze, AnalyzeResult } from "./lib/wappalyzer";

export type TechnologyGathererOptions = {};

export class TechnologyGatherer extends BaseGatherer<AnalyzeResult> {
  constructor(
    private readonly _technologyGathererOptions: TechnologyGathererOptions,
  ) {
    super({
      description: "Technology Gatherer",
      name: "Technology Gatherer",
      version: "1.0.0",
      id: "technology.gatherer",
    });
  }

  public async execute(context: BaseContext) {
    const result = analyze(context);

    return result;
  }
}
