import { assign, createMachine } from "xstate";

export const initialScrapeMachine = createMachine(
	{
		context: {
			error: "",
			scrapedUrls: {},
			scrapingUrl: "",
			urlsToScrape: [],
		},
		id: "InitialScrape",
		initial: "LoadURLs",
		states: {
			LoadURLs: {
				entry: {
					type: "loadURLs",
				},
				always: {
					target: "ScrapeURL",
				},
			},
			ScrapeURL: {
				entry: ["setScrapingUrl"],
				exit: ["finishCheckingUrl"],
				always: {
					target: "Done",
					guard: "emptyUrlsToScrape",
				},
				invoke: {
					src: "scrapeURL",
					id: "scrapeURL",
					input: ({ context }) => ({ url: context.scrapingUrl }),
					onDone: [
						{
							target: "ScrapeURL",
							reenter: true,
							actions: "removeUrlToScrape",
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
			Error: {
				type: "final",
			},
			Done: {
				entry: "complete",
				type: "final",
			},
		},
		types: {
			context: {} as {
				error: string;
				scrapedUrls: { [key: string]: string };
				scrapingUrl: string;
				urlsToScrape: string[];
			},
		},
	},
	{
		actions: {
			setScrapingUrl: assign({
				scrapingUrl: ({ context }) => context.urlsToScrape[0] ?? "",
			}),
			finishCheckingUrl: assign({
				scrapedUrls: ({ context, event }) => ({
					...context.scrapedUrls,
					[event.output.url]: event.output.document,
				}),
			}),
			setError: assign({
				error: ({ event }) => event.output,
			}),
			removeUrlToScrape: assign({
				urlsToScrape: ({ context, event }) =>
					context.urlsToScrape.filter((v) => v !== event.output.url),
			}),
		},
		guards: {
			emptyUrlsToScrape: ({ context }) => context.urlsToScrape.length === 0,
		},
	},
);
