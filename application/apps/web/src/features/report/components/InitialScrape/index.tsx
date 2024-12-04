import { Stack } from "@mui/material";
import { useMachine } from "@xstate/react";
import { ContextFrom, assign, fromPromise } from "xstate";

import { useUrlScrape } from "../../hooks/useUrlScrape";
import {
	useNewProjectMachineContext,
	useNewProjectMachineSelector,
} from "../../states/newProject.machine";
import { UrlScrapeTimelineItem } from "../UrlTimelineItem";

import { useEffect } from "react";
import { AlignedTimeline } from "~/features/ui/components/AlignedTimeline";
import { useDebugContext } from "~/features/ui/contexts/DebugContext";
import { initialScrapeMachine } from "./machine";

const getUrlStatus = (
	url: string,
	context: ContextFrom<typeof initialScrapeMachine>,
) => {
	if (context.scrapingUrl === url) {
		return "loading";
	}
	if (
		context.urlsToScrape.includes(url) ||
		(context.urlsToScrape.length === 0 &&
			Object.keys(context.scrapedUrls).length === 0)
	) {
		return "waiting";
	}
	if (Object.keys(context.scrapedUrls).includes(url)) {
		return "ok";
	}

	return "error";
};

export const InitialScrape = () => {
	const urlsToCheck = useNewProjectMachineSelector((state) =>
		Object.keys(state.context.urlsData),
	);
	const newProjectRef = useNewProjectMachineContext();
	const { run: urlScrape } = useUrlScrape();

	const [state] = useMachine(
		initialScrapeMachine.provide({
			actions: {
				loadURLs: assign({
					urlsToScrape: () => urlsToCheck,
				}),
				complete: ({ context }) => {
					newProjectRef.send({
						type: "INITIAL_SCRAPE_CHECK_COMPLETE",
						output: { urls: context.scrapedUrls },
					});
				},
			},
			actors: {
				scrapeURL: fromPromise(async ({ input: { url } }) => {
					const testResult = await urlScrape(url);

					return { ...testResult, url };
				}),
			},
		}),
	);

	// Debug only
	const { appendMachine, removeMachine } = useDebugContext();
	useEffect(() => {
		appendMachine("InitialScrapeMachine", { data: { ...state } });

		return () => {
			removeMachine("InitialScrapeMachine");
		};
	}, [state]);

	console.log(state);

	return (
		<Stack>
			<AlignedTimeline>
				{urlsToCheck.map((url) => (
					<UrlScrapeTimelineItem
						key={url}
						url={url}
						status={getUrlStatus(url, state.context)}
					/>
				))}
			</AlignedTimeline>
		</Stack>
	);
};
