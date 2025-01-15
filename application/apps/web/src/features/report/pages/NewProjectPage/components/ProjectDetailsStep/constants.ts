import { FORM_NAME } from "~/features/report/components/ProjectDetailsForm";
import { ProjectDetailsStep } from ".";
import { StepView } from "../../types/StepView";

export const PROJECT_DETAILS_STEP: StepView = {
	component: ProjectDetailsStep,
	label: "Project Details",
	formName: FORM_NAME,
};
