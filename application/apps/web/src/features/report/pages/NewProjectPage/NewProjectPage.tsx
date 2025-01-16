"use client";
import {
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Button,
	Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { Loading } from "~/features/ui/components/Loading";
import { ProjectDetailsForm } from "../../components/ProjectDetailsForm";
import { useAuditState } from "../../states/auditState";
import { RoundedAccordion } from "./components/RoundedAccordion";
import { useControlledAccordion } from "./hooks/useControlledAccordion";
import { useProjectDetailsProps } from "./hooks/useProjectDetailsProps";
import { useNewProjectState } from "./state";
import { Step } from "./types/Steps";

// import { STEPS } from "./constants";
// import { useNewProjectState } from "./state";

export function NewProjectPage() {
	const { isExpanded, expandOrCollapse, expand } = useControlledAccordion({
		initialExpanded: [Step.ProjectDetails],
	});
	const { activeStep } = useNewProjectState();
	useEffect(() => {
		expand(activeStep);
	}, [activeStep]);
	const projectDetailsProps = useProjectDetailsProps();

	if (!useAuditState.persist.hasHydrated()) return <Loading />;

	return (
		<>
			<RoundedAccordion
				expanded={isExpanded(Step.ProjectDetails)}
				onChange={() => expandOrCollapse(Step.ProjectDetails)}
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					Project Details
				</AccordionSummary>
				<AccordionDetails>
					<ProjectDetailsForm {...projectDetailsProps} />
				</AccordionDetails>
				<AccordionActions>
					<Button type="submit" form={ProjectDetailsForm.FORM_NAME}>
						Continue
					</Button>
				</AccordionActions>
			</RoundedAccordion>
			<RoundedAccordion
				disabled={activeStep === Step.ProjectDetails}
				expanded={isExpanded(Step.ConnectionCheck)}
				onChange={() => expandOrCollapse(Step.ConnectionCheck)}
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography component="span">Accordion 1</Typography>
				</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					malesuada lacus ex, sit amet blandit leo lobortis eget.
				</AccordionDetails>
			</RoundedAccordion>
		</>
		// <Container
		// 	sx={{
		// 		display: "flex",
		// 		flexDirection: "column",
		// 		justifyContent: "center",
		// 		alignItems: "center",
		// 		height: "100%",
		// 	}}
		// >
		// 	<Card sx={{ minWidth: "32rem" }}>
		// 		<CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
		// 			<NewProjectStepper />
		// 			<StepView
		// 				onNext={
		// 					isFormStep
		// 						? goNext
		// 						: () => useNewProjectState.setState({ stepComplete: true })
		// 				}
		// 			/>
		// 		</CardContent>
		// 		<CardActions sx={{ justifyContent: "space-between" }}>
		// 			<Button disabled={!canGoBack()} onClick={goBack}>
		// 				Reset
		// 			</Button>
		// 			<Button disabled={!canGoNext() && !isFormStep} {...nextButtonProps}>
		// 				Next
		// 			</Button>
		// 		</CardActions>
		// 	</Card>
		// </Container>
	);
}
