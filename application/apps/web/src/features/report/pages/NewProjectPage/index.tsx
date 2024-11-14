"use client";
import {
	Button,
	ButtonProps,
	Card,
	CardActions,
	CardContent,
	Container,
} from "@mui/material";
import { useEffect } from "react";
import { StateValue } from "xstate";

import {
	NewProjectMachineProvider,
	useNewProjectMachineContext,
	useNewProjectMachineSelector,
} from "../../states/newProject.machine";

import { useDebugContext } from "~/features/ui/contexts/DebugContext";
import { NewProjectStepper } from "./components/NewProjectStepper";
import { STEPS } from "./constants";

const getTopLevelState = (step: StateValue) => {
	if (typeof step === "string") {
		return step;
	}

	return Object.keys(step)[0];
};

function NewProjectPageWithoutContext() {
	const { send } = useNewProjectMachineContext();
	const canGoBack = useNewProjectMachineSelector((state) =>
		state.can({ type: "BACK" }),
	);
	const canGoNext = useNewProjectMachineSelector((state) =>
		state.can({ type: "COMPLETE" }),
	);
	const value = useNewProjectMachineSelector((state) => state.value);

	// Debug only
	const { appendMachine } = useDebugContext();
	const state = useNewProjectMachineSelector((state) => state);
	useEffect(() => {
		appendMachine("NewProjectMachine", { data: { ...state } });
	}, [state]);

	const currentStep = getTopLevelState(value) as keyof typeof STEPS;

	const activeStep = STEPS[currentStep];
	const isFormStep = Boolean(activeStep.formName);
	const nextButtonProps: ButtonProps = isFormStep
		? { type: "submit", form: activeStep.formName }
		: { disabled: !canGoNext, onClick: () => send({ type: "COMPLETE" }) };

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
					<Button disabled={!canGoBack} onClick={() => send({ type: "BACK" })}>
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
