import React, { useEffect } from "react";

// import { appInjector } from "~/modules/audit";
// import { Gatherers } from "~/modules/gatherers";

// import { getNewProjectFormState } from "../../states/newProjectForm.state";

export function Gather() {
  //   const { projectDetails } = getNewProjectFormState();
  //   const runner = appInjector.resolve("audit.runner");

  useEffect(() => {
    // runner.setActiveGatherers([Gatherers.LIGHTHOUSE]);
    // // runner.gather({
    // //   projectName: projectDetails?.name ?? "",
    // //   projectUrl: projectDetails?.url ?? "",
    // //   testedUrls: projectDetails?.testedUrls ?? [],
    // // });
  }, []);

  return <div>Gather</div>;
}
