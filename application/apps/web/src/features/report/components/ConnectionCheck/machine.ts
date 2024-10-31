"use client";
import { assign, createMachine } from "xstate";

export const connectionCheckMachine = createMachine(
  {
    id: "ConnectionCheck",
    initial: "SpeedTest",
    context: {
      checkingUrl: "",
      urlsToCheck: [],
      checkedUrls: [],
      error: "",
    },
    states: {
      SpeedTest: {
        invoke: {
          src: "checkSpeed",
          id: "checkSpeed",
          onDone: [
            {
              target: "LoadURLs",
            },
          ],
          onError: [
            {
              target: "Error",
              actions: "setError",
            },
          ],
        },
      },
      LoadURLs: {
        entry: "loadURLs",
        always: "CheckURL",
      },
      CheckURL: {
        entry: "setCheckingUrl",
        exit: "finishCheckingUrl",
        always: {
          target: "Done",
          guard: "emptyUrlsToCheck",
        },
        invoke: {
          src: "checkURL",
          id: "checkURL",
          input: ({ context }) => ({ url: context.checkingUrl }),
          onError: [
            {
              target: "Error",
              actions: "setError",
            },
          ],
          onDone: [
            {
              target: "CheckURL",
              reenter: true,
              actions: "removeUrlToCheck",
            },
          ],
        },
      },
      Error: {
        type: "final",
      },
      Done: {
        type: "final",
        entry: "complete",
      },
    },
    types: {
      context: {} as {
        checkingUrl: string;
        urlsToCheck: string[];
        checkedUrls: string[];
        error: string;
      },
    },
  },
  {
    actions: {
      setError: assign({
        error: ({ event }) => event.output,
      }),
      removeUrlToCheck: assign({
        urlsToCheck: ({ context, event }) =>
          context.urlsToCheck.filter((v) => v !== event.output.url),
      }),
      setCheckingUrl: assign({
        checkingUrl: ({ context }) => context.urlsToCheck[0] ?? "",
      }),
      finishCheckingUrl: assign({
        checkedUrls: ({ context }) => [
          ...(context.checkedUrls ?? []),
          context.checkingUrl,
        ],
        checkingUrl: "",
      }),
    },
    guards: {
      emptyUrlsToCheck: ({ context }) => context.urlsToCheck.length === 0,
    },
  },
);
