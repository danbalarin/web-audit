"use client";
import {
	AccordionDetails,
	type AccordionProps,
	AccordionSummary,
	Alert,
	Stack,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material-pigment-css";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { useRouter } from "next/navigation";
import { UrlTestTimelineItem } from "~/features/report/components/UrlTimelineItem";
import { REPORT_ROUTES } from "~/features/report/config/routes";
import { AlignedTimeline } from "~/features/ui/components/AlignedTimeline";
import { RoundedAccordion } from "~/features/ui/components/RoundedAccordion";
import { StatusTimelineItem } from "~/features/ui/components/StatusTimelineItem";
import { useCreateProject } from "../../hooks/useCreateProject";
import { useNewProjectState } from "../../states/useNewProjectState";
import { Step } from "../../types/Steps";
import { useCheckUrls } from "./hooks/useCheckUrls";
import { useConnectionCheckState } from "./states/useConnectionCheckState";

type ConnectionCheckStepProps = Omit<AccordionProps, "children">;

export function ConnectionCheckStep(props: ConnectionCheckStepProps) {
	const { push } = useRouter();
	const { mutateAsync, isPending, isSuccess } = useCreateProject({
		onSuccess: (data) => {
			useNewProjectState.getState().clear();
			push(REPORT_ROUTES.PROJECT(data.id));
		},
	});

	const { status, urlsOk, error } = useConnectionCheckState(
		useShallow((s) => ({ status: s.status, urlsOk: s.urlsOk, error: s.error })),
	);

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

	const { activeStep, project } = useNewProjectState();
	const urls = useMemo(
		() => [project?.homeUrl, ...(project?.urls ?? [])],
		[project],
	);

	const { checkAllUrls } = useCheckUrls(urls);
	const theme = useTheme();

	useEffect(() => {
		if (activeStep !== Step.ConnectionCheck) {
			return;
		}
		switch (status) {
			case "idle":
				checkAllUrls();
				break;
			case "urlCheckComplete": {
				const state = useConnectionCheckState.getState();
				const noError = !state.error;
				const allUrlsOk =
					Object.values(state.urlsOk).every((ok) => ok) &&
					Object.values(state.urlsOk).length === urls.length;
				if (noError && allUrlsOk) {
					const data = useNewProjectState.getState();
					mutateAsync(data.project);
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
			<AccordionSummary>
				<Typography component="span">Connection Check</Typography>
			</AccordionSummary>
			<AccordionDetails
				sx={{ borderRadius: 1, color: "var(--form-text-list-color)" }}
				style={{
					"--form-text-list-color": disabled ? disabledColor : "inherit",
				}}
			>
				<Stack>
					{error && <Alert severity="error">{error}</Alert>}
					<AlignedTimeline>
						{urls.map((url, index) => (
							<UrlTestTimelineItem
								key={url ?? index}
								url={url}
								status={getUrlStatus(url)}
							/>
						))}
						<StatusTimelineItem status={isPending ? "loading" : "waiting"}>
							Project creation
							<Stack
								direction="row"
								alignItems="center"
								gap={1}
								ml={1.5}
								mt={1.5}
							>
								{!isPending && !isSuccess && "Waiting for connection check"}
								{isSuccess && "Project created, redirecting..."}
								{isPending && "Creating project"}
							</Stack>
						</StatusTimelineItem>
					</AlignedTimeline>
				</Stack>
			</AccordionDetails>
		</RoundedAccordion>
	);
}
