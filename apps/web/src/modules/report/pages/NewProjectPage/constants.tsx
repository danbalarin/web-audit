import React from "react";

import { ConnectionCheck } from "../../components/ConnectionCheck";
import { Gather } from "../../components/Gather";
import {
  ProjectDetailsForm,
  FORM_NAME as PROJECT_DETAILS_FORM_NAME,
} from "../../components/ProjectDetailsForm";
import { States } from "../../states/newProject.machine";

type Step = {
  label: string;
  component: React.ReactNode;
  formName?: string;
};

export const STEP_LABELS: Record<States, string> = {
  ProjectDetails: "Project Details",
  ConnectionCheck: "Connection Check",
  InitialScrape: "Fetching Data",
  Gatherers: "Gather Data",
};

export const STEPS: Record<States, Step> = {
  ProjectDetails: {
    label: "Project Details",
    component: <ProjectDetailsForm />,
    formName: PROJECT_DETAILS_FORM_NAME,
  },
  ConnectionCheck: {
    label: "Connection Check",
    component: <ConnectionCheck />,
  },
  InitialScrape: {
    label: "Fetching Data",
    component: "Fetching Data",
  },
  Gatherers: {
    label: "Gather Data",
    component: <Gather />,
  },
};
