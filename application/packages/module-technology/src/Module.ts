import { BaseModule } from "@repo/api";
import {
  TechnologyGatherer,
  TechnologyGathererOptions,
} from "./TechnologyGatherer";

export type TechnologyModuleOptions = {
  technologyOptions?: TechnologyGathererOptions;
};

export class TechnologyModule extends BaseModule {
  constructor(
    private readonly _technologyModuleOptions: TechnologyModuleOptions,
  ) {
    super({
      description: "Technology Module",
      name: "Technology",
      version: "1.0.0",
      id: "technology",
      gatherers: [
        new TechnologyGatherer(
          _technologyModuleOptions.technologyOptions ?? {},
        ),
      ],
    });
  }
}
