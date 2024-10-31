"use client";
import { Stack } from "@mui/material";
import { useMachine } from "@xstate/react";
import React from "react";
import { ContextFrom, assign, fromPromise } from "xstate";

import { AlignedTimeline } from "~/features/ui/components/AlignedTimeline";

import { useSpeedTest } from "../../hooks/useSpeedTest";
import { useUrlTest } from "../../hooks/useUrlTest";
import {
  useNewProjectMachineContext,
  useNewProjectMachineSelector,
} from "../../states/newProject.machine";
import { UrlTestTimelineItem } from "../UrlTimelineItem";

import { NetworkSpeedTimelineItem } from "./components/NetworkSpeedTimelineItem";
import { MAX_SPEED } from "./constants";
import { connectionCheckMachine } from "./machine";

const getUrlStatus = (
  url: string,
  context: ContextFrom<typeof connectionCheckMachine>,
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
  const urlsToCheck = useNewProjectMachineSelector((state) =>
    Object.keys(state.context.urlsData),
  );

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
    }),
  );

  return (
    <Stack>
      <AlignedTimeline>
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
      </AlignedTimeline>
    </Stack>
  );
}
