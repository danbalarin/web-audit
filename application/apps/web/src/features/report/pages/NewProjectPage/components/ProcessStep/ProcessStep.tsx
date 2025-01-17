// import { appInjector } from "~/modules/audit";
// import { Gatherers } from "~/modules/gatherers";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Alert,
} from "@mui/material";
import { useAuditState } from "~/features/report/states/auditState";
import { AlignedTimeline } from "~/features/ui/components/AlignedTimeline";
import { RoundedAccordion } from "../RoundedAccordion";
import { ProcessUrl } from "./parts/ProcessUrl";

type ProcessStepProps = Omit<AccordionProps, "children">;

export function ProcessStep(props: ProcessStepProps) {
	const urls = useAuditState((s) => s.urls);
	// const { run, urlsState } = useProcessUrls();
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
			<AccordionDetails>
				<Alert severity="info">
					Processing can take some time, please do not close this window.
				</Alert>
				<AlignedTimeline>
					{Object.entries(urls).map(([url]) => (
						<ProcessUrl url={url} key={url} />
					))}
				</AlignedTimeline>
			</AccordionDetails>
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
