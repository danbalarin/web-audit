import { BaseContext, BaseGatherer } from "@repo/api";
import Wappalyzer from "wappalyzer";

export type TechnologyGathererOptions = {};

export type Technology = {
  name: string;
  categories: string[];
  groups: string[];
};

export type TechnologyGathererResult = {
  technologies: Technology[];
};

export class TechnologyGatherer extends BaseGatherer<TechnologyGathererResult> {
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
    return {
      technologies: [],
    };
  }

  private async runWappalyzer(url: string) {
    const wappalyzer = new Wappalyzer({});

    await wappalyzer.init();

    await wappalyzer.open(url);

    const technologies = await wappalyzer.analyze();

    return technologies;
  }
}
