import {
	AccordionActions,
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Button,
} from "@mui/material";
import {
	ProjectDetailsForm,
	ProjectDetailsFormValues,
} from "~/features/report/components/ProjectDetailsForm";
import { useNewProjectState } from "../../states/useNewProjectState";
import { Step } from "../../types/Steps";
import { RoundedAccordion } from "../RoundedAccordion";

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
			<AccordionSummary>Project Details</AccordionSummary>
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
