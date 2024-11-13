"use client";
import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

import { useNewProjectMachineSelector } from "../../../../states/newProject.machine";
import { STEP_LABELS } from "../../constants";

export function NewProjectStepper() {
	const activeStep = useNewProjectMachineSelector((state) =>
		Object.keys(STEP_LABELS).findIndex((v) => state.matches(v)),
	);

	return (
		<Stepper activeStep={activeStep} alternativeLabel>
			{Object.values(STEP_LABELS).map((label) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}
