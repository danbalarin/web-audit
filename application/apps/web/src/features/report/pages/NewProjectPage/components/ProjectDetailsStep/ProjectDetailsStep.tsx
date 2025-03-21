import {
	AccordionActions,
	AccordionDetails,
	type AccordionProps,
	AccordionSummary,
	Button,
	Typography,
} from "@mui/material";
import {
	ProjectDetailsForm,
	type ProjectDetailsFormValues,
} from "~/features/report/components/ProjectDetailsForm";
import { RoundedAccordion } from "~/features/ui/components/RoundedAccordion";
import { useNewProjectState } from "../../states/useNewProjectState";
import { Step } from "../../types/Steps";

type ProjectDetailsStepProps = Omit<AccordionProps, "children">;

export function ProjectDetailsStep(props: ProjectDetailsStepProps) {
	const { activeStep } = useNewProjectState();

	const onSubmit = async (data: ProjectDetailsFormValues) => {
		useNewProjectState.setState({
			activeStep: Step.ConnectionCheck,
			project: {
				name: data.projectName,
				homeUrl: data.homeUrl,
				urls: data.urls,
			},
		});
	};
	const disabled = activeStep !== Step.ProjectDetails;

	return (
		<RoundedAccordion {...props}>
			<AccordionSummary>
				<Typography component="span">Project Details</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<ProjectDetailsForm onSubmit={onSubmit} disabled={disabled} />
			</AccordionDetails>
			{!disabled && (
				<AccordionActions>
					<Button
						disabled={disabled}
						type="submit"
						form={ProjectDetailsForm.FORM_NAME}
					>
						Continue
					</Button>
				</AccordionActions>
			)}
		</RoundedAccordion>
	);
}
