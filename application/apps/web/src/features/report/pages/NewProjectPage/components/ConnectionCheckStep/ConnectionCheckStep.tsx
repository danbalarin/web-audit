"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	AccordionActions,
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Button,
	Stack,
} from "@mui/material";
import { useTheme } from "@mui/material-pigment-css";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { UrlTestTimelineItem } from "~/features/report/components/UrlTimelineItem";
import { useAuditState } from "~/features/report/states/auditState";
import { AlignedTimeline } from "~/features/ui/components/AlignedTimeline";
import { useNewProjectState } from "../../state";
import { Step } from "../../types/Steps";
import { RoundedAccordion } from "../RoundedAccordion";
import { NetworkSpeedTimelineItem } from "./components/NetworkSpeedTimelineItem";
import { useCheckAllUrls } from "./hooks/useCheckAllUrls";
import { useRunSpeedTest } from "./hooks/useRunSpeedTest";
import { useConnectionCheckState } from "./state";

type ConnectionCheckStepProps = Omit<AccordionProps, "children">;

export function ConnectionCheckStep(props: ConnectionCheckStepProps) {
	const { urlsData } = useAuditState(useShallow((s) => ({ urlsData: s.urls })));
	const { status, speed, urlsOk } = useConnectionCheckState(
		useShallow((s) => ({ status: s.status, speed: s.speed, urlsOk: s.urlsOk })),
	);
	const urls = useMemo(() => Object.keys(urlsData), [urlsData]);
	const getUrlStatus = (url: string) => {
		if (status.includes(url)) {
			return "loading";
		}
		if (urlsOk[url] === true) {
			return "ok";
		} else if (urlsOk[url] === false) {
			return "error";
		}
		return "waiting";
	};

	const { checkAllUrls } = useCheckAllUrls();
	const { runSpeedTest } = useRunSpeedTest();
	const { activeStep, goNext, stepComplete } = useNewProjectState();
	const theme = useTheme();

	useEffect(() => {
		if (activeStep !== Step.ConnectionCheck) {
			return;
		}
		switch (status) {
			case "idle":
				runSpeedTest();
				break;
			case "speedCheckComplete":
				checkAllUrls();
				break;
			case "urlCheckComplete": {
				const state = useConnectionCheckState.getState();
				const noError = !state.error;
				const speedOk = state.speed?.status !== "slow";
				const allUrlsOk = Object.values(state.checkUrlResult).every((ok) => ok);
				if (noError && speedOk && allUrlsOk) {
					useNewProjectState.setState({ stepComplete: true });
				}
				break;
			}
			default:
				break;
		}
	}, [status, activeStep]);

	const disabledColor = theme.palette.text.disabled;
	const disabled = activeStep !== Step.ConnectionCheck;

	return (
		<RoundedAccordion {...props}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				Connection Check
			</AccordionSummary>
			<AccordionDetails
				sx={{ borderRadius: 1, color: "var(--form-text-list-color)" }}
				style={{
					"--form-text-list-color": disabled ? disabledColor : "inherit",
				}}
			>
				<Stack>
					<AlignedTimeline>
						<NetworkSpeedTimelineItem status={speed?.status} />
						{urls.map((url) => (
							<UrlTestTimelineItem
								key={url}
								url={url}
								status={getUrlStatus(url)}
							/>
						))}
					</AlignedTimeline>
				</Stack>
			</AccordionDetails>
			<AccordionActions>
				<Button
					disabled={!stepComplete || activeStep !== Step.ConnectionCheck}
					onClick={goNext}
				>
					Continue
				</Button>
			</AccordionActions>
		</RoundedAccordion>
	);
}
