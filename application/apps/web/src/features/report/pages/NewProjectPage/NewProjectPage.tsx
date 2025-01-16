"use client";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header"
			>
				<Typography component="span">Accordion 1</Typography>
			</AccordionSummary>
			<AccordionDetails>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
				malesuada lacus ex, sit amet blandit leo lobortis eget.
			</AccordionDetails>
		</Accordion>
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
