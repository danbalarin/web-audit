export type UrlTimelineState = "ok" | "error" | "loading" | "waiting";

export const URL_TEST_TIMELINE_ITEM_STATES: Record<UrlTimelineState, string> = {
	ok: "Reachable",
	error: "Failed to load",
	loading: "Checking",
	waiting: "Waiting for previous tests",
};

export const URL_SCRAPE_TIMELINE_ITEM_STATES: Record<UrlTimelineState, string> =
	{
		ok: "Fetched",
		error: "Failed to load",
		loading: "Fetching data",
		waiting: "Waiting for previous requests",
	};
