"use client";
import {
	Button,
	ButtonProps,
	Card,
	CardActions,
	CardContent,
	Container,
} from "@mui/material";
import { StateValue } from "xstate";

import {
	NewProjectMachineProvider,
	useNewProjectMachineContext,
	useNewProjectMachineSelector,
} from "../../states/newProject.machine";

import {
	useDebugMachine,
	useSaveMachine,
} from "~/features/ui/hooks/useSavedMachine";
import { NewProjectStepper } from "./components/NewProjectStepper";
import { STEPS } from "./constants";

const getTopLevelState = (step: StateValue) => {
	if (typeof step === "string") {
		return step;
	}

	return Object.keys(step)[0];
};

function NewProjectPageWithoutContext() {
	const actor = useNewProjectMachineContext();
	const state = useNewProjectMachineSelector((state) => state);
	const canGoBack = state.can({ type: "BACK" });
	const canGoNext = state.can({ type: "COMPLETE" });

	useDebugMachine(actor);
	useSaveMachine(actor);

	const currentStep = getTopLevelState(state.value) as keyof typeof STEPS;

	const activeStep = STEPS[currentStep];
	const isFormStep = Boolean(activeStep.formName);
	const nextButtonProps: ButtonProps = isFormStep
		? { type: "submit", form: activeStep.formName }
		: { disabled: !canGoNext, onClick: () => actor.send({ type: "COMPLETE" }) };

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			<Card sx={{ minWidth: "32rem" }}>
				<CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
					<NewProjectStepper />
					{activeStep.component}
				</CardContent>
				<CardActions sx={{ justifyContent: "space-between" }}>
					<Button
						disabled={!canGoBack}
						onClick={() => actor.send({ type: "BACK" })}
					>
						Reset
					</Button>
					<Button disabled={!canGoNext && !isFormStep} {...nextButtonProps}>
						Next
					</Button>
				</CardActions>
			</Card>
		</Container>
	);
}

export const NewProjectPage = () => (
	<NewProjectMachineProvider>
		<NewProjectPageWithoutContext />
	</NewProjectMachineProvider>
);
