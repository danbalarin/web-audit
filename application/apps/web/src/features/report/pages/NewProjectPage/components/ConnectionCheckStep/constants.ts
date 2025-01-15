export const MAX_SPEED = 10; // MB/s
import { ConnectionCheckStep } from ".";
import { StepView } from "../../types/StepView";

export const CONNECTION_CHECK_STEP: StepView = {
	component: ConnectionCheckStep,
	label: "Connection Check",
};
