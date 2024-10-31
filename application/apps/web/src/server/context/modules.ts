import { LighthouseModule } from "@repo/module-lighthouse";

export const createModulesContext = async () => {
  const LighthouseModuleInstance = new LighthouseModule({
    performanceOptions: { numberOfRuns: 1 },
  });

  return {
    modules: {
      Lighthouse: LighthouseModuleInstance,
    },
  };
};
