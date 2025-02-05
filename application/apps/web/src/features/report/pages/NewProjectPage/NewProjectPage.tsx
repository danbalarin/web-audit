"use client";

import { useEffect } from "react";
import { ConnectionCheckStep } from "./components/ConnectionCheckStep";
import { ProjectDetailsStep } from "./components/ProjectDetailsStep";
import { useControlledAccordion } from "./hooks/useControlledAccordion";
import { useNewProjectState } from "./states/useNewProjectState";
import { Step } from "./types/Steps";

export function NewProjectPage() {
	const { isExpanded, expandOrCollapse, expand } = useControlledAccordion({
		initialExpanded: [Step.ProjectDetails],
	});
	const { activeStep } = useNewProjectState();
	useEffect(() => {
		expand(activeStep);
	}, [activeStep]);

	return (
		<>
			<ProjectDetailsStep
				expanded={isExpanded(Step.ProjectDetails)}
				onChange={() => expandOrCollapse(Step.ProjectDetails)}
			/>
			<ConnectionCheckStep
				disabled={activeStep < Step.ConnectionCheck}
				expanded={isExpanded(Step.ConnectionCheck)}
				onChange={() => expandOrCollapse(Step.ConnectionCheck)}
			/>
		</>
	);
}
