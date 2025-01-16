// import { appInjector } from "~/modules/audit";
// import { Gatherers } from "~/modules/gatherers";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
} from "@mui/material";
import { RoundedAccordion } from "../RoundedAccordion";

type ProcessStepProps = Omit<AccordionProps, "children">;

export function ProcessStep(props: ProcessStepProps) {
	//   const { projectDetails } = getNewProjectFormState();
	// const runner = appInjector.resolve("audit.runner");

	// useEffect(() => {
	// runner.setActiveGatherers([Gatherers.LIGHTHOUSE]);
	// runner.gather({
	//   projectName: projectDetails?.name ?? "",
	//   projectUrl: projectDetails?.url ?? "",
	//   testedUrls: projectDetails?.testedUrls ?? [],
	// });
	// }, []);

	return (
		<RoundedAccordion {...props}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				Process Urls
			</AccordionSummary>
			<AccordionDetails>Processing hard</AccordionDetails>
			{/* {!disabled && (
				<AccordionActions>
					<Button
						disabled={disabled}
						type="submit"
						form={ProjectDetailsForm.FORM_NAME}
					>
						Continue
					</Button>
				</AccordionActions>
			)} */}
		</RoundedAccordion>
	);
}
