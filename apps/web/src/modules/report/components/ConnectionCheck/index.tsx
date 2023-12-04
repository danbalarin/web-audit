"use client";
import { Timeline, timelineItemClasses, Stack } from "@repo/ui";
import { useMachine } from "@xstate/react";
import React from "react";
import { ContextFrom, assign, fromPromise } from "xstate";

import { useSpeedTest } from "../../hooks/useSpeedTest";
import { useUrlTest } from "../../hooks/useUrlTest";
import {
  useNewProjectMachineContext,
  useNewProjectMachineSelector,
} from "../../states/newProject.machine";

import { NetworkSpeedTimelineItem } from "./components/NetworkSpeedTimelineItem";
import { UrlTestTimelineItem } from "./components/UrlTestTimelineItem";
import { MAX_SPEED } from "./constants";
import { connectionCheckMachine } from "./machine";

const getUrlStatus = (
  url: string,
  context: ContextFrom<typeof connectionCheckMachine>
) => {
  if (context.checkingUrl === url) {
    return "loading";
  }
  if (
    context.urlsToCheck.includes(url) ||
    (context.urlsToCheck.length === 0 && context.checkedUrls.length === 0)
  ) {
    return "waiting";
  }
  if (context.checkedUrls.includes(url)) {
    return "ok";
  }

  return "error";
};

export function ConnectionCheck() {
  const homeURL = useNewProjectMachineSelector(
    (state) => state.context.homeURL
  );
  const otherUrls = useNewProjectMachineSelector((state) =>
    Object.keys(state.context.urlsData)
  );

  const urlsToCheck = [homeURL, ...otherUrls];

  const { speed, run: speedTest, status, isCompleted } = useSpeedTest({});
  const { run: urlTest } = useUrlTest();
  const newProjectRef = useNewProjectMachineContext();

  const [state] = useMachine(
    connectionCheckMachine.provide({
      actions: {
        loadURLs: assign({
          urlsToCheck: () => urlsToCheck,
        }),
        complete: () => {
          newProjectRef.send({
            type: "CONNECTION_CHECK_COMPLETE",
            output: { networkSpeed: speed },
          });
        },
      },
      actors: {
        checkSpeed: fromPromise(speedTest),
        checkURL: fromPromise(async ({ input: { url } }) => {
          const testResult = await urlTest(url);

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
        <NetworkSpeedTimelineItem
          maxSpeed={MAX_SPEED}
          speed={speed}
          status={isCompleted ? status : undefined}
        />
        {urlsToCheck.map((url) => (
          <UrlTestTimelineItem
            key={url}
            url={url}
            status={getUrlStatus(url, state.context)}
          />
        ))}
      </Timeline>
    </Stack>
  );
}
