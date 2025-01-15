"use client";
import { Stack } from "@mui/material";
import { useShallow } from "zustand/react/shallow";

import { AlignedTimeline } from "~/features/ui/components/AlignedTimeline";

import { useEffect, useMemo } from "react";
import { UrlTestTimelineItem } from "~/features/report/components/UrlTimelineItem";
import { useAuditState } from "~/features/report/states/auditState";
import { NetworkSpeedTimelineItem } from "./components/NetworkSpeedTimelineItem";
import { MAX_SPEED } from "./constants";
import { useCheckAllUrls } from "./hooks/useCheckAllUrls";
import { useRunSpeedTest } from "./hooks/useRunSpeedTest";
import { useConnectionCheckState } from "./state";

export function ConnectionCheckStep({ onNext }: { onNext: () => void }) {
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

	useEffect(() => {
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
					onNext();
				}
				break;
			}
			default:
				break;
		}
	}, [status]);

	return (
		<Stack>
			<AlignedTimeline>
				<NetworkSpeedTimelineItem maxSpeed={MAX_SPEED} status={speed?.status} />
				{urls.map((url) => (
					<UrlTestTimelineItem key={url} url={url} status={getUrlStatus(url)} />
				))}
			</AlignedTimeline>
		</Stack>
	);
}
