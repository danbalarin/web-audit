// import { appInjector } from "~/modules/audit";
// import { Gatherers } from "~/modules/gatherers";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	AccordionActions,
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Alert,
	Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuditState } from "~/features/report/states/auditState";
import { AlignedTimeline } from "~/features/ui/components/AlignedTimeline";
import { useNewProjectState } from "../../state";
import { RoundedAccordion } from "../RoundedAccordion";
import { ProcessUrl } from "./parts/ProcessUrl";

type ProcessStepProps = Omit<AccordionProps, "children">;

export function ProcessStep(props: ProcessStepProps) {
	const urls = useAuditState((s) => s.urls);
	const [isRunning, setIsRunning] = useState(false);
	const [waitingUrls, setWaitingUrls] = useState<string[]>(Object.keys(urls));
	const createOnComplete = (url: string) => () => {
		isRunning && setIsRunning(false);
		setWaitingUrls((prev) => prev.filter((u) => u !== url));
	};

	useEffect(() => {
		if (waitingUrls.length === 0) {
			useNewProjectState.setState({ stepComplete: true });
		}
	}, [waitingUrls]);

	const { canGoNext, goNext } = useNewProjectState();

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
						<ProcessUrl
							url={url}
							key={url}
							disabled={isRunning}
							onStart={() => setIsRunning(true)}
							onComplete={createOnComplete(url)}
						/>
					))}
				</AlignedTimeline>
			</AccordionDetails>
			<AccordionActions>
				<Button disabled={!canGoNext()} onClick={goNext}>
					Continue
				</Button>
			</AccordionActions>
		</RoundedAccordion>
	);
}
