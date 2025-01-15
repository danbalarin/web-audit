"use client";
import { Step, StepLabel, Stepper } from "@mui/material";

import { STEPS } from "../../constants";
import { useNewProjectState } from "../../state";

export function NewProjectStepper() {
	const activeStep = useNewProjectState((s) => s.activeStep);

	return (
		<Stepper activeStep={activeStep} alternativeLabel>
			{Object.values(STEPS).map(({ label }) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}
