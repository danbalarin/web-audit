import {
  MemoryStorage,
  ModuleProcessorState,
  ModuleProcessor,
} from "@repo/api";
import { LighthouseModule } from "@repo/module-lighthouse";

export const createModulesContext = async () => {
  const storage = new MemoryStorage<ModuleProcessorState>();
  const moduleProcessor = new ModuleProcessor({ storage });

  const LighthouseModuleInstance = new LighthouseModule({
    performanceOptions: { numberOfRuns: 1 },
  });

  return {
    modules: {
      Lighthouse: LighthouseModuleInstance,
    },
    moduleProcessor,
  };
};
