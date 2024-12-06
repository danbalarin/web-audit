"use client";

import { createActorContext } from "@xstate/react";
import { DoneActorEvent, assign, createMachine } from "xstate";
import { clearMachines, loadMachine } from "~/features/ui/utils/machineStorage";

type UrlData = {
	html?: string;
	gathererOutputs?: { name: string; data: object }[];
};

type InitialScrapeInvokeEvent = DoneActorEvent<{
	urls: { [k: string]: string };
}>;

type BackEvent = {
	type: "BACK";
};

type CompleteEvent = {
	type: "COMPLETE";
};

type ProjectDetailsCompleteEvent = {
	type: "PROJECT_DETAILS_COMPLETE";
	output: {
		projectName: string;
		homeURL: string;
		urls: string[];
	};
};

type ConnectionCheckCompleteEvent = {
	type: "CONNECTION_CHECK_COMPLETE";
	output: {
		networkSpeed: number;
	};
};

type InitialScrapeCompleteEvent = {
	type: "INITIAL_SCRAPE_CHECK_COMPLETE";
	output: {
		urls: { [k: string]: string };
	};
};

type SetInitialScrapeInvokeEvent = DoneActorEvent<{
	urls: { [k: string]: string };
}>;

// TODO move to API lib
type GathererOutput = {
	name: string;
	data: object;
};

type GatherersOutput = {
	urls: { [k: string]: GathererOutput[] };
};

type SetGatherersInvokeEvent = DoneActorEvent<GatherersOutput>;

type Events =
	| BackEvent
	| CompleteEvent
	| ProjectDetailsCompleteEvent
	| ConnectionCheckCompleteEvent
	| SetInitialScrapeInvokeEvent
	| InitialScrapeInvokeEvent
	| InitialScrapeCompleteEvent;

export type States =
	| "ProjectDetails"
	| "ConnectionCheck"
	| "InitialScrape"
	| "Gatherers";

export const newProjectMachine = createMachine(
	{
		context: {
			projectName: "",
			homeURL: "",
			networkSpeed: 0,
			urlsData: {},
		},
		id: "NewProject",
		initial: "ProjectDetails",
		states: {
			ProjectDetails: {
				on: {
					PROJECT_DETAILS_COMPLETE: {
						target: "ConnectionCheck",
						actions: [
							{
								type: "deleteLocalStorage",
							},
							{
								type: "setProjectDetails",
							},
						],
					},
				},
			},
			ConnectionCheck: {
				on: {
					BACK: {
						target: "ProjectDetails",
						actions: "deleteLocalStorage",
					},
					CONNECTION_CHECK_COMPLETE: {
						actions: "setNetworkSpeed",
					},
					COMPLETE: {
						target: "InitialScrape",
						guard: "isNetworkSpeedValid",
					},
				},
			},
			InitialScrape: {
				on: {
					BACK: {
						target: "ProjectDetails",
						actions: "deleteLocalStorage",
					},
					INITIAL_SCRAPE_CHECK_COMPLETE: {
						actions: "setInitialScrape",
					},
					COMPLETE: {
						target: "Gatherers",
						guard: "isInitialScrapeValid",
					},
				},
			},
			Gatherers: {
				invoke: {
					src: "runGatherers",
					id: "runGatherers",
					onError: [
						{
							target: "Gatherers",
						},
					],
					onDone: [
						{
							target: "Gatherers",
							actions: "setGatherers",
						},
					],
				},
				on: {
					BACK: {
						target: "ProjectDetails",
					},
					COMPLETE: {
						target: "ProjectDetailPage",
					},
				},
			},
			ProjectDetailPage: {
				type: "final",
			},
		},
		types: {
			events: {} as Events,
			context: {} as {
				homeURL: string;
				projectName: string;
				networkSpeed: number;
				urlsData: {
					[k: string]: UrlData;
				};
			},
		},
	},
	{
		guards: {
			isNetworkSpeedValid: ({ context }) => context.networkSpeed > 0,
			isInitialScrapeValid: ({ context }) =>
				Object.values(context.urlsData).every(
					(urlData) => urlData.html !== undefined,
				),
		},
		actions: {
			deleteLocalStorage: () => {
				clearMachines();
			},
			setProjectDetails: assign({
				projectName: ({ event }) =>
					(event as ProjectDetailsCompleteEvent).output.projectName,
				homeURL: ({ event }) =>
					(event as ProjectDetailsCompleteEvent).output.homeURL,
				urlsData: ({ event }) =>
					(event as ProjectDetailsCompleteEvent).output.urls.reduce(
						(acc, url) => ({ ...acc, [url]: {} }),
						{} as { [k: string]: UrlData },
					),
			}),
			setNetworkSpeed: assign({
				networkSpeed: ({ event }) =>
					(event as ConnectionCheckCompleteEvent).output.networkSpeed,
			}),
			setInitialScrape: assign({
				urlsData: ({ event, context }) => {
					const { urls } = (event as SetInitialScrapeInvokeEvent).output;
					const data = Object.entries(urls).reduce(
						(acc, [url, html]) => ({
							...acc,
							[url]: { ...context.urlsData[url], html },
						}),
						{} as { [k: string]: UrlData },
					);

					return data;
				},
			}),
			setGatherers: assign({
				urlsData: ({ event, context }) => {
					const { urls } = (event as unknown as SetGatherersInvokeEvent).output;

					const res = Object.entries(urls).reduce(
						(acc, [url, data]) => ({
							...acc,
							[url]: { ...context.urlsData[url], gathererOutputs: data },
						}),
						{} as { [k: string]: UrlData },
					);

					return res;
				},
			}),
		},
	},
);

export type NewProjectMachineType = typeof newProjectMachine;

const newProjectMachineContext = createActorContext(newProjectMachine, {
	snapshot: loadMachine(newProjectMachine.id),
});
export const NewProjectMachineProvider = newProjectMachineContext.Provider;
export const useNewProjectMachineContext = newProjectMachineContext.useActorRef;
export const useNewProjectMachineSelector =
	newProjectMachineContext.useSelector;
