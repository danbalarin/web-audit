"use client";
import {
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Button,
	Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProjectDetailsForm } from "../../components/ProjectDetailsForm";
import { RoundedAccordion } from "./components/RoundedAccordion";

// import { STEPS } from "./constants";
// import { useNewProjectState } from "./state";

export function NewProjectPage() {
	// const { activeStep, goBack, canGoBack, canGoNext, goNext } =
	// 	useNewProjectState();

	// const activeStepView = STEPS[activeStep];
	// const isFormStep = Boolean(activeStepView.formName);
	// const nextButtonProps: ButtonProps = isFormStep
	// 	? { type: "submit", form: activeStepView.formName }
	// 	: { onClick: goNext };

	// const StepView = activeStepView.component;

	return (
		<>
			<RoundedAccordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					Project Details
				</AccordionSummary>
				<AccordionDetails>
					<ProjectDetailsForm onSubmit={console.log} />
				</AccordionDetails>
				<AccordionActions>
					<Button type="submit" form={ProjectDetailsForm.FORM_NAME}>
						Continue
					</Button>
				</AccordionActions>
			</RoundedAccordion>
			<RoundedAccordion>
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
