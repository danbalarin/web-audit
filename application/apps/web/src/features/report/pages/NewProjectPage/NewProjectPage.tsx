"use client";

import { useEffect } from "react";
import { Loading } from "~/features/ui/components/Loading";
import { useAuditState } from "../../states/auditState";
import { ConnectionCheckStep } from "./components/ConnectionCheckStep";
import { ProcessStep } from "./components/ProcessStep";
import { ProjectDetailsStep } from "./components/ProjectDetailsStep";
import { useControlledAccordion } from "./hooks/useControlledAccordion";
import { useNewProjectState } from "./state";
import { Step } from "./types/Steps";

export function NewProjectPage() {
	const { isExpanded, expandOrCollapse, expand } = useControlledAccordion({
		initialExpanded: [Step.ProjectDetails],
	});
	const { activeStep } = useNewProjectState();
	useEffect(() => {
		expand(activeStep);
	}, [activeStep]);

	if (!useAuditState.persist?.hasHydrated()) return <Loading />;

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
			<ProcessStep
				disabled={activeStep < Step.Process}
				expanded={isExpanded(Step.Process)}
				onChange={() => expandOrCollapse(Step.Process)}
			/>
		</>
	);
}
