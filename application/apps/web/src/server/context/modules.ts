// import { LighthouseModule } from "@repo/module-lighthouse";
import { TechnologyModule } from "@repo/module-technology";

export const createModulesContext = async () => {
  // const LighthouseModuleInstance = new LighthouseModule({
  //   performanceOptions: { numberOfRuns: 1 },
  // });

  const TechnologyModuleInstance = new TechnologyModule({});

  return {
    modules: {
      // Lighthouse: LighthouseModuleInstance,
      Technology: TechnologyModuleInstance,
    },
  };
};
