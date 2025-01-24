import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { useAuditState } from "~/features/report/states/auditState";
import { useNewProjectState } from "../../state";
import { Step } from "../../types/Steps";
import { RoundedAccordion } from "../RoundedAccordion";

type ProjectDetailsStepProps = Omit<AccordionProps, "children">;

export function ProjectDetailsStep(props: ProjectDetailsStepProps) {
	const { activeStep } = useNewProjectState();
	const { name, urls } = useAuditState();
	const [homeUrl, restUrls] = Object.entries(urls).reduce(
		(acc, [url, data]) => [
			data.isHome ? url : acc[0],
			data.isHome ? acc[1] : [...acc[1], url],
		],
		["", []] as [string, string[]],
	);

	const defaultValues = {
		projectName: name,
		homeUrl,
		urls: restUrls,
	} as ProjectDetailsFormValues;
	const onSubmit = (data: ProjectDetailsFormValues) => {
		useAuditState.setState({
			name: data.projectName,
			urls: {
				[data.homeUrl]: { isHome: true },
				...data.urls.reduce(
					(acc, url) => ({ ...acc, [url]: { isHome: false } }),
					{},
				),
			},
		});
		useNewProjectState.setState({ activeStep: Step.ConnectionCheck });
	};
	const disabled = activeStep !== Step.ProjectDetails;

	return (
		<RoundedAccordion {...props}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				Project Details
			</AccordionSummary>
			<AccordionDetails>
				<ProjectDetailsForm
					defaultValues={defaultValues}
					onSubmit={onSubmit}
					disabled={disabled}
				/>
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
