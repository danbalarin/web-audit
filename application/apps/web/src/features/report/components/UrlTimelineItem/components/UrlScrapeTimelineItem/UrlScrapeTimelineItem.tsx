import React from "react";

import { URL_SCRAPE_TIMELINE_ITEM_STATES } from "../../constants";
import { UrlTimelineItem, type UrlTimelineItemProps } from "../UrlTimelineItem";

type Props = Omit<UrlTimelineItemProps, "config">;

export function UrlScrapeTimelineItem(props: Props) {
	return (
		<UrlTimelineItem {...props} config={URL_SCRAPE_TIMELINE_ITEM_STATES} />
	);
}
