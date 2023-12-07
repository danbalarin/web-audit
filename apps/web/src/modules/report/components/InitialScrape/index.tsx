import { Stack, Timeline, timelineItemClasses } from "@repo/ui";
import { useMachine } from "@xstate/react";
import * as React from "react";
import { ContextFrom, assign, fromPromise } from "xstate";

import { useUrlScrape } from "../../hooks/useUrlScrape";
import {
  useNewProjectMachineContext,
  useNewProjectMachineSelector,
} from "../../states/newProject.machine";
import { UrlScrapeTimelineItem } from "../UrlTimelineItem";

import { initialScrapeMachine } from "./machine";

const getUrlStatus = (
  url: string,
  context: ContextFrom<typeof initialScrapeMachine>
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
    Object.keys(state.context.urlsData)
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
    })
  );

  return (
    <Stack>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}::before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {urlsToCheck.map((url) => (
          <UrlScrapeTimelineItem
            key={url}
            url={url}
            status={getUrlStatus(url, state.context)}
          />
        ))}
      </Timeline>
    </Stack>
  );
};
